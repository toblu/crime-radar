import React from "react";
import { Route, useHistory, useLocation} from "react-router-dom";
import { PrivateRouteComponent, PrivateWrapperComponent } from "./PrivateRoute.types";
import { useAuth } from "../shared/hooks";
import { LocationState } from "../shared/types/auth.types";

const LOGIN_ROUTE = '/login';

const PrivateComponentWrapper: PrivateWrapperComponent = ({isAuthenticated, redirectOnLogout, children}) => {
  const history = useHistory<LocationState>();
  const location = useLocation();
  const wasAuthenticated = React.useRef(isAuthenticated);

  React.useEffect(() => {
    if (!isAuthenticated && wasAuthenticated.current) {
      // User was authenticated, but has now logged out, redirect user to fallback route
      history.push(redirectOnLogout);
    } else if (!isAuthenticated && !wasAuthenticated.current) {
      // User is logged out and was not previously authenticated, redirect to login page
      history.push(LOGIN_ROUTE, {fromUrl: location.pathname} )
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}

const PrivateRoute: PrivateRouteComponent = ({ path, fallbackRoute = '/', children, ...routeProps }) => {
  const {loading, auth} = useAuth();
  const isUserAuthenticated = !!auth?.user;

  const history = useHistory();

  // If loading is true, it means that the user is currently being authenticated
  if (loading) return null;

  return <Route path={path} {...routeProps}>
    <PrivateComponentWrapper isAuthenticated={isUserAuthenticated} redirectOnLogout={fallbackRoute}>{children}</PrivateComponentWrapper>
  </Route>
};

export default PrivateRoute;
