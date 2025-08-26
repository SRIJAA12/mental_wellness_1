'use client';

import { useEffect } from 'react';

export const useBootstrap = () => {
  useEffect(() => {
    const initBootstrap = () => {
      if (typeof window !== 'undefined') {
        try {
          require('bootstrap/dist/js/bootstrap.bundle.min.js');
        } catch (error) {
          console.error('Bootstrap loading error:', error);
        }
      }
    };

    // Load Bootstrap after the component mounts
    initBootstrap();
  }, []);
};
