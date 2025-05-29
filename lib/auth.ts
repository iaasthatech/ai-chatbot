// import { apiClient } from './api-client';

// export type UserType = 'guest' | 'regular';

// export interface User {
//   id: string;
//   email: string;
//   type: UserType;
// }

// export interface Session {
//   user: User;
//   expires: string;
// }

// export function signOut() {
//   localStorage.removeItem('token');
//   window.location.href = '/login';
// }

// export async function getSession(): Promise<Session | null> {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return null;

//     // Get user info from API
//     const user = await apiClient.getMe();
//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         type: user.type || 'regular'
//       },
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
//     };
//   } catch (error) {
//     return null;
//   }
// } 

import { apiClient } from './api-client';
import { jwtDecode } from 'jwt-decode';

export type UserType = 'guest' | 'regular';

export interface User {
  id: string;
  email: string;
  type: UserType;
}

export interface Session {
  user: User;
  expires: string;
}

export function signOut() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

export async function getSession(): Promise<Session | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // Get user info from API
    const user = await apiClient.getMe();
    return {
      user: {
        id: user.id,
        email: user.email,
        type: user.type || 'regular'
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    };
  } catch (error) {
    return null;
  }
}

// --- Auto-logout on token expiry ---
let logoutTimer: NodeJS.Timeout | null = null;

interface DecodedToken {
  exp: number; // expiration time in seconds
}

export function startTokenWatcher() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const expiresAt = decoded.exp * 1000; // convert to milliseconds
    const timeLeft = expiresAt - Date.now();

    if (timeLeft <= 0) {
      signOut(); // Already expired
      return;
    }

    if (logoutTimer) clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
      signOut();
    }, timeLeft);
  } catch (error) {
    console.error('Invalid token:', error);
    signOut();
  }
}
