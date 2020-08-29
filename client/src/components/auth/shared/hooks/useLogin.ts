import { useHistory, useLocation } from 'react-router-dom';
import { AuthRedirectLocationState } from './../types/auth.types';

const LOGIN_ROUTE = '/login';

export default () => {
  const history = useHistory<AuthRedirectLocationState>();
  const location = useLocation();

  const login = () => {
    history.push(LOGIN_ROUTE, {
      fromUrl: location.pathname
    });
  };

  return [login];
};
