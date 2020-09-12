export type Level = 'info' | 'success' | 'warning' | 'error';

export type Props = {
  level: Level;
  children: React.ReactNode;
  closeable?: boolean;
};

export type NotificationBoxComponent = React.FC<Props>;
