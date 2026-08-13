export type UserRole = 'user' | 'admin';

export interface UserSession {
  email: string;
  role: UserRole;
  name: string;
  school?: string;
  grade?: string;
}

const USER_EMAIL_KEY = 'eduwellness_user_email';
const USER_ROLE_KEY = 'eduwellness_user_role';
const USER_NAME_KEY = 'eduwellness_user_name';
const USER_SCHOOL_KEY = 'eduwellness_user_school';
const USER_GRADE_KEY = 'eduwellness_user_grade';

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
  const userName = name || email.split('@')[0];
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem(USER_ROLE_KEY, role);
    localStorage.setItem(USER_NAME_KEY, userName);
    localStorage.setItem(USER_SCHOOL_KEY, school);
    localStorage.setItem(USER_GRADE_KEY, grade);
  }
  return { email, role, name: userName, school, grade };
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
