type SignupFormViewProps = {
    onSignup: ({
        email,
        password
    }: {
        email: string;
        password: string;
    }) => Promise<void>;
    errors: string[];
};

export type SignupFormContainerComponent = React.FC<{}>;
export type SignupFormViewComponent = React.FC<SignupFormViewProps>;
