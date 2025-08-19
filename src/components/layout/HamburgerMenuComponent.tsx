'use client';

import { useState, useImperativeHandle, forwardRef } from 'react';

interface HamburgerMenuProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'dark' | 'light' | 'primary';
  animationSpeed?: 'fast' | 'normal' | 'slow';
  className?: string;
}

export interface HamburgerMenuRef {
  toggle: () => void;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

const HamburgerMenu = forwardRef<HamburgerMenuRef, HamburgerMenuProps>(({
  size = 'md',
  color = 'dark',
  animationSpeed = 'normal',
  className = ''
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const getIsOpen = () => {
    return isOpen;
  };


  useImperativeHandle(ref, () => ({
    toggle,
    open,
    close,
    isOpen: getIsOpen
  }));

  return (
    <button
      onClick={toggle}
      className={`
        flex flex-col rounded-lg hover:bg-gray-100 transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        ${size === 'sm' ? 'gap-1 p-2' : size === 'lg' ? 'gap-1.5 p-3' : 'gap-1 p-2'}
        ${className}
      `}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      title={isOpen ? "Close menu" : "Open menu"}
    >
      {/* Top line */}
      <div
        className={`
          ${size === 'sm' ? 'w-4' : size === 'lg' ? 'w-6' : 'w-5'} h-0.5 
          ${color === 'light' ? 'bg-white' : color === 'primary' ? 'bg-red-500' : 'bg-slate-600'} 
          rounded-full transition-all origin-center
          ${animationSpeed === 'fast' ? 'duration-150' : animationSpeed === 'slow' ? 'duration-500' : 'duration-300'}
          ${isOpen 
            ? 'rotate-45 translate-y-1.5' 
            : 'rotate-0 translate-y-0'
          }
        `}
      />
      
      {/* Middle line */}
      <div
        className={`
          ${size === 'sm' ? 'w-4' : size === 'lg' ? 'w-6' : 'w-5'} h-0.5 
          ${color === 'light' ? 'bg-white' : color === 'primary' ? 'bg-red-500' : 'bg-slate-600'} 
          rounded-full transition-all
          ${animationSpeed === 'fast' ? 'duration-150' : animationSpeed === 'slow' ? 'duration-500' : 'duration-300'}
          ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `}
      />
      
      {/* Bottom line */}
      <div
        className={`
          ${size === 'sm' ? 'w-4' : size === 'lg' ? 'w-6' : 'w-5'} h-0.5 
          ${color === 'light' ? 'bg-white' : color === 'primary' ? 'bg-red-500' : 'bg-slate-600'} 
          rounded-full transition-all origin-center
          ${animationSpeed === 'fast' ? 'duration-150' : animationSpeed === 'slow' ? 'duration-500' : 'duration-300'}
          ${isOpen 
            ? '-rotate-45 -translate-y-1.5' 
            : 'rotate-0 translate-y-0'
          }
        `}
      />
    </button>
  );
});

HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;