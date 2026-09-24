import React, { useState } from 'react';
import { Sparkles, Menu, X, User as UserIcon, LogOut, Image as ImageIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { AppUser, authService } from '../../services/firebase';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: AppUser | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'create', label: 'Create' },
    { id: 'styles', label: 'Styles' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await authService.logout();
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-900 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-cinzel">
                Bhakti<span className="text-amber-400">Vision</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-wide hidden sm:block">
              Your Face. Your Identity. Your Devotional Form.
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-amber-200 hover:border-amber-400 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  {currentUser.displayName?.[0]?.toUpperCase() || 'D'}
                </div>
                <span className="max-w-[100px] truncate">{currentUser.displayName}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-amber-500/30 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-xs font-semibold text-white truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('gallery');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-amber-300"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    My Generations
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-slate-800"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-sm text-slate-300 hover:text-amber-300 font-medium px-3 py-2 transition-colors flex items-center gap-1.5"
            >
              <UserIcon className="w-4 h-4" />
              Sign In
            </button>
          )}

          <Button
            size="sm"
            onClick={() => handleNavClick('create')}
            icon={<Sparkles className="w-4 h-4 text-slate-950" />}
          >
            Create Image
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            size="sm"
            onClick={() => handleNavClick('create')}
            className="text-xs px-2.5 py-1.5"
          >
            Create
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-amber-500/20 bg-slate-950/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === item.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-amber-200">Hi, {currentUser.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-sm font-medium text-amber-300 bg-slate-900 border border-amber-500/30 rounded-xl"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
