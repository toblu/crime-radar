type LoginFormViewProps = {
    onSubmit: ({
        email,
        password
    }: {
        email: string;
        password: string;
    }) => Promise<void>;
    errors: string[];
};

export type LoginFormContainerComponent = React.FC<{}>;
export type LoginFormViewComponent = React.FC<LoginFormViewProps>;
