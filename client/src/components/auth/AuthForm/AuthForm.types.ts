type Props = {
  validatePassword?: boolean;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  errors?: string[];
};

export type AuthFormComponent = React.FC<Props>;
