import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
    PrivateRouteComponent,
    PrivateWrapperComponent
} from './PrivateRoute.types';
import { useAuth, useLogin } from '../../../shared/hooks';
import { AuthRedirectLocationState } from '../../../shared/types/auth.types';

const PrivateComponentWrapper: PrivateWrapperComponent = ({
    isAuthenticated,
    redirectOnLogout,
    children
}) => {
    const history = useHistory<AuthRedirectLocationState>();
    const wasAuthenticated = React.useRef(isAuthenticated);
    const [login] = useLogin();

    React.useEffect(() => {
        if (!isAuthenticated && wasAuthenticated.current) {
            // User was authenticated, but has now logged out, redirect user to fallback route
            history.push(redirectOnLogout);
        } else if (!isAuthenticated && !wasAuthenticated.current) {
            // User is logged out and was not previously authenticated, redirect to login page
            login();
        }
        wasAuthenticated.current = isAuthenticated;
    }, [history, isAuthenticated, login, redirectOnLogout]);

    return isAuthenticated ? <>{children}</> : null;
};

export const PrivateRouteContainer: PrivateRouteComponent = ({
    path,
    fallbackRoute = '/',
    children,
    ...routeProps
}) => {
    const { loading, auth } = useAuth();
    const isUserAuthenticated = !!auth?.user;

    // If loading is true, it means that the user is currently being authenticated
    if (loading) return null;

    return (
        <Route path={path} {...routeProps}>
            <PrivateComponentWrapper
                isAuthenticated={isUserAuthenticated}
                redirectOnLogout={fallbackRoute}
            >
                {children}
            </PrivateComponentWrapper>
        </Route>
    );
};
