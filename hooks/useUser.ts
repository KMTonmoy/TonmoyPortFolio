import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import axios from 'axios';

export interface UserData {
  _id?: string;
  email: string;
  name: string;
  photo: string;
  role: 'user' | 'admin';
  createdAt?: number;
  lastLogin?: number;
}

export const useUser = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`
      );
      setUserData(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  return { userData, loading, error, refetch: fetchUserData };
};