import { ChangeEvent } from 'react';

type AuthFormContainerProps = {
  validatePassword?: boolean;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  errors?: string[];
};

type AuthFormViewProps = {
  email: string;
  password: string;
  confirmPassword?: string;
  onSubmit: () => void;
  onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorFields: Record<string, boolean>;
  errorMessages: Record<string, string>;
  isValid: boolean;
  validatePassword?: boolean;
  errors: string[];
};

export type AuthFormComponent = React.FC<AuthFormContainerProps>;
export type AuthFormViewComponent = React.FC<AuthFormViewProps>;
