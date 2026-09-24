import React from 'react';
import { DevotionalStyle } from '../../types/style';
import { StyleCard } from './StyleCard';

interface StyleGridProps {
  styles: DevotionalStyle[];
  selectedStyleId?: string;
  onSelectStyle: (style: DevotionalStyle) => void;
  onPreviewSample?: (style: DevotionalStyle) => void;
}

export const StyleGrid: React.FC<StyleGridProps> = ({
  styles,
  selectedStyleId,
  onSelectStyle,
  onPreviewSample,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {styles.map((style) => (
        <StyleCard
          key={style.id}
          style={style}
          isSelected={selectedStyleId === style.id}
          onSelect={onSelectStyle}
          onPreviewSample={onPreviewSample}
        />
      ))}
    </div>
  );
};
