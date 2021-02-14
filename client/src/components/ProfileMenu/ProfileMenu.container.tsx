import React from 'react';
import { ProfileMenuContainerComponent } from './ProfileMenu.types';
import { ProfileMenuView } from './ProfileMenu.view';
import { useAuth, useLogin, useLogout } from '../shared/hooks';

export const ProfileMenuContainer: ProfileMenuContainerComponent = () => {
  const { loading: authLoading, auth } = useAuth();
  const [login] = useLogin();
  const [logout] = useLogout();

  if (authLoading) return null;
  const isLoggedIn = Boolean(auth?.user);

  return (
    <ProfileMenuView
      isLoggedIn={isLoggedIn}
      onLogin={login}
      onLogout={() => {
        // @ts-ignore why is logout not callable??
        logout();
      }}
    />
  );
};
