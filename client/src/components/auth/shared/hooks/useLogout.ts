import { useMutation } from '@apollo/client';
import CURRENT_USER from '../../../../graphql/queries/currentUser';
import LOGOUT from '../../../../graphql/mutations/logout';

export default () => {
  const [logout, result] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }]
  });
  return [logout, result];
};
