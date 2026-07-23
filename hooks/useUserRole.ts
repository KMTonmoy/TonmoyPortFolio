 
import { useUser } from './useUser';

export const useUserRole = () => {
  const { userData, loading, error, refetch } = useUser();

  return {
    role: userData?.role || 'user',
    isAdmin: userData?.role === 'admin',
    isUser: userData?.role === 'user',
    status: userData?.status || 'active',
    isBlocked: userData?.status === 'blocked',
    loading,
    error,
    refetch,
  };
};