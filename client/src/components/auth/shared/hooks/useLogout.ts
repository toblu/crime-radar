import { useMutation } from '@apollo/client';
import { CURRENT_USER } from '../../../../graphql/queries';
import { LOGOUT } from '../../../../graphql/mutations';

export const useLogout = () => {
  const [logout, result] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }]
  });
  return [logout, result];
};
