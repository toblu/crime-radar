import { RouteProps } from 'react-router-dom';

type PrivateRouteProps = Omit<
    RouteProps,
    'path' | 'component' | 'render' | 'children'
> & {
    fallbackRoute?: string;
    path: string;
    children: React.ReactNode;
};

export type PrivateRouteComponent = React.FC<PrivateRouteProps>;

type PrivateComponentWrapperProps = {
    isAuthenticated: boolean;
    redirectOnLogout: string;
    children: React.ReactNode;
};

export type PrivateWrapperComponent = React.FC<PrivateComponentWrapperProps>;
