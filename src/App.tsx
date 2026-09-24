/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Styles } from './pages/Styles';
import { Gallery } from './pages/Gallery';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { authService, AppUser } from './services/firebase';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [targetStyleId, setTargetStyleId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Listen to Firebase or local auth state
    const unsubscribe = authService.onUserChange((user) => {
      setCurrentUser(user);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const navigateTo = (page: string, styleId?: string) => {
    if (styleId) {
      setTargetStyleId(styleId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home onNavigate={(page, styleId) => navigateTo(page, styleId)} />
        )}

        {currentPage === 'create' && (
          <Create
            currentUser={currentUser}
            onOpenAuth={() => setAuthModalOpen(true)}
            initialStyleId={targetStyleId}
            onNavigate={(page) => navigateTo(page)}
          />
        )}

        {currentPage === 'styles' && (
          <Styles
            onSelectStyleForCreation={(styleId) => navigateTo('create', styleId)}
          />
        )}

        {currentPage === 'gallery' && (
          <Gallery
            currentUser={currentUser}
            onOpenAuth={() => setAuthModalOpen(true)}
            onNavigateToCreate={() => navigateTo('create')}
          />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorks onNavigateToCreate={() => navigateTo('create')} />
        )}

        {currentPage === 'about' && (
          <About onNavigateToCreate={() => navigateTo('create')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(page) => navigateTo(page)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
