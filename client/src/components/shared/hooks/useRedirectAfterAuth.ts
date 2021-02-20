import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { AuthRedirectLocationState } from '../types/auth.types';

export const useRedirectAfterAuth = (fallbackRedirect: string = '/') => {
    const location = useLocation<AuthRedirectLocationState>();
    const history = useHistory<AuthRedirectLocationState>();
    const redirectUrl = location.state?.fromUrl ?? fallbackRedirect;

    const { auth } = useAuth();

    React.useEffect(() => {
        if (auth?.user) {
            history.push(redirectUrl);
        }
    }, [auth, history, redirectUrl]);
};
