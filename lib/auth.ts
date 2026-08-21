export type UserRole = 'user' | 'admin';

export interface UserSession {
  email: string;
  role: UserRole;
  name: string;
  school?: string;
  grade?: string;
}

export interface RegisteredAccount {
  email: string;
  password?: string;
  name: string;
  school: string;
  grade: string;
  role: UserRole;
  createdAt: string;
}

const USER_EMAIL_KEY = 'eduwellness_user_email';
const USER_ROLE_KEY = 'eduwellness_user_role';
const USER_NAME_KEY = 'eduwellness_user_name';
const USER_SCHOOL_KEY = 'eduwellness_user_school';
const USER_GRADE_KEY = 'eduwellness_user_grade';
const REGISTERED_ACCOUNTS_KEY = 'eduwellness_registered_accounts_registry';

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
    const school = localStorage.getItem(USER_SCHOOL_KEY) || 'SMP N 1 SEYEGAN';
    const grade = localStorage.getItem(USER_GRADE_KEY) || 'Kelas VII';

    return { email, role, name, school, grade };
  } catch (error) {
    return null;
  }
}

/**
 * Saves user session to localStorage.
 */
export function saveSession(
  email: string,
  role: UserRole = 'user',
  name?: string,
  school: string = 'SMP N 1 SEYEGAN',
  grade: string = 'Kelas VII'
): UserSession {
  const cleanEmail = email.trim().toLowerCase();
  const userName = name?.trim() || cleanEmail.split('@')[0];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_EMAIL_KEY, cleanEmail);
    localStorage.setItem(USER_ROLE_KEY, role);
    localStorage.setItem(USER_NAME_KEY, userName);
    localStorage.setItem(USER_SCHOOL_KEY, school);
    localStorage.setItem(USER_GRADE_KEY, grade);
  }
  return { email: cleanEmail, role, name: userName, school, grade };
}

/**
 * Registers an account in persistent local registry to ensure reliable login across sessions.
 */
export function registerLocalAccount(
  email: string,
  password?: string,
  name?: string,
  school: string = 'SMP N 1 SEYEGAN',
  grade: string = 'Kelas VII',
  role: UserRole = 'user'
): RegisteredAccount {
  const cleanEmail = email.trim().toLowerCase();
  const userName = name?.trim() || cleanEmail.split('@')[0];
  const newAccount: RegisteredAccount = {
    email: cleanEmail,
    password: password || '',
    name: userName,
    school,
    grade,
    role,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
      const registry: Record<string, RegisteredAccount> = stored ? JSON.parse(stored) : {};
      registry[cleanEmail] = newAccount;
      localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(registry));
    } catch (e) {
      console.warn('Failed to save to local account registry:', e);
    }
  }

  return newAccount;
}

/**
 * Looks up a registered account from local registry.
 */
export function getLocalAccount(email: string): RegisteredAccount | null {
  if (typeof window === 'undefined') return null;

  try {
    const cleanEmail = email.trim().toLowerCase();
    const stored = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    if (!stored) return null;
    const registry: Record<string, RegisteredAccount> = JSON.parse(stored);
    return registry[cleanEmail] || null;
  } catch (e) {
    return null;
  }
}

/**
 * Clears current user session from localStorage.
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(USER_SCHOOL_KEY);
    localStorage.removeItem(USER_GRADE_KEY);
  }
}

/**
 * Checks if the current logged-in user is an Admin.
 */
export function isAdminSession(): boolean {
  const session = getCurrentSession();
  return session?.role === 'admin';
}

