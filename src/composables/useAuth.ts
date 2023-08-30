import { useCookies } from '@vueuse/integrations/useCookies';
import { useClearAppStorage } from './useAppStorage';
import { useFetch } from './useFetch';
import { User } from '#root/common/index';
import { ref } from 'vue';

export function useAuth() {
  const isLoading = ref(false);
  const error = ref<null | Record<string, any>>(null);
  const cookieName = 'connect.sid'; // The default name set by express-session.
  const cookies = useCookies([]);
  const { clear } = useClearAppStorage();

  const { $fetch, error: err } = useFetch<User & { accessToken: string }>('login', {
    method: 'POST',
    credentials: 'include',
  });

  function isAuthenticated() {
    return cookies.get(cookieName) !== undefined;
  }

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;
    return $fetch({ body: { email, password } }).finally(() => {
      isLoading.value = false;
      if (err) error.value = err.value;
    });

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
    isLoading,
    error,
    login,
    logout,
  };
}
