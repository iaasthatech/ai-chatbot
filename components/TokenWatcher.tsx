'use client';

import { useEffect } from 'react';
import { startTokenWatcher } from '@/lib/auth';

export function TokenWatcher() {
  useEffect(() => {
    startTokenWatcher();
  }, []);

  return null; // nothing to render
}
