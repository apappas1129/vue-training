import { useCookies } from '@vueuse/integrations/useCookies';
import { useClearAppStorage } from './useAppStorage';
import { useFetch } from './useFetch';
import { User } from '#root/common';

export function useAuth() {
  const cookieName = 'connect.sid'; // The default name set by express-session.
  const cookies = useCookies([]);
  const { clear } = useClearAppStorage();

  function isAuthenticated() {
    return cookies.get(cookieName) !== undefined;
  }

  async function login(email: string, password: string) {
    // Do auth request with your API
    console.info('Sending HTTP Request to login.', { email, password });

    const { $fetch } = useFetch<{ user: User }>('login', {
      method: 'POST',
      body: { email, password },
      credentials: 'include',
    });
    // FIXME: TS inferred type is still Promise<void> despite having T defined in useFetch above.
    return $fetch();

    // NOTE: The mocked login API uses express-session which automatically writes an
    // HttpOnly cookie on the browser upon response.
  }

  async function logout() {
    const { $fetch } = useFetch<{ user: User }>('logout', { method: 'POST', credentials: 'include' });

    return $fetch().then(() => {
      // TODO: Confirm that express-session logout response automatically clears cookie as expected.
      // cookies.remove(cookieName);
      clear();
    });
  }

  return {
    isAuthenticated,
    login,
    logout,
  };
}
