export type UserRole = 'user' | 'admin';

export interface UserSession {
  email: string;
  role: UserRole;
  name: string;
}

const USER_EMAIL_KEY = 'eduwellness_user_email';
const USER_ROLE_KEY = 'eduwellness_user_role';
const USER_NAME_KEY = 'eduwellness_user_name';

/**
 * Retrieves the current logged in user session from localStorage safely.
 */
export function getCurrentSession(): UserSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const email = localStorage.getItem(USER_EMAIL_KEY);
    if (!email) return null;

    const role = (localStorage.getItem(USER_ROLE_KEY) as UserRole) || 'user';
    const name = localStorage.getItem(USER_NAME_KEY) || email.split('@')[0];

    return { email, role, name };
  } catch (error) {
    return null;
  }
}

/**
 * Saves user session to localStorage.
 */
export function saveSession(email: string, role: UserRole = 'user', name?: string): UserSession {
  const userName = name || email.split('@')[0];
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem(USER_ROLE_KEY, role);
    localStorage.setItem(USER_NAME_KEY, userName);
  }
  return { email, role, name: userName };
}

/**
 * Clears current user session from localStorage.
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USER_NAME_KEY);
  }
}

/**
 * Checks if the current logged-in user is an Admin.
 */
export function isAdminSession(): boolean {
  const session = getCurrentSession();
  return session?.role === 'admin';
}
