import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../../../graphql/queries';
import { User } from '../types/auth.types';

export const useAuth = () => {
  const { loading, data, error } = useQuery<{ user: User }>(CURRENT_USER);
  return { loading, auth: data, error };
};
