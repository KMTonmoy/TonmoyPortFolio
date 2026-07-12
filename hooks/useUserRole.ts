 
import { useUser } from './useUser';

export const useUserRole = () => {
  const { userData, loading, error } = useUser();

  return {
    role: userData?.role || 'user',
    isAdmin: userData?.role === 'admin',
    isUser: userData?.role === 'user',
    loading,
    error,
  };
};