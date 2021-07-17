type LogoViewProps = {
    logo: 'react' | 'node' | 'aws' | 'apollo' | 'graphql' | 'mongodb';
};

export type LogoViewComponent = React.FC<LogoViewProps>;
