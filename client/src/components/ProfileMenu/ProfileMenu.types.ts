type ProfileMenuViewProps = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

export type ProfileMenuContainerComponent = React.FC<{}>;
export type ProfileMenuViewComponent = React.FC<ProfileMenuViewProps>;
