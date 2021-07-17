import React from 'react';
import { makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import ReactLogo from './reactLogo.svg';
import NodejsLogo from './nodejsLogo.svg';
import ApolloLogo from './apolloLogo.svg';
import AwsLogo from './awsLogo.svg';
import GraphqlLogo from './graphqlLogo.svg';
import MongodbLogo from './mongodbLogo.svg';
import { LogoViewComponent } from './Logo.types';

const styles = (theme: Theme) => ({
    root: {
        margin: theme.spacing(1)
    }
});

const useStyles = makeStyles(styles);

const imgProps = {
    react: {
        src: ReactLogo,
        alt: 'React'
    },
    node: {
        src: NodejsLogo,
        alt: 'NodeJS'
    },
    apollo: { src: ApolloLogo, alt: 'Apollo' },
    aws: {
        src: AwsLogo,
        alt: 'AWS'
    },
    graphql: {
        src: GraphqlLogo,
        alt: 'GraphQL'
    },
    mongodb: {
        src: MongodbLogo,
        alt: 'MongoDB'
    }
};

export const LogoView: LogoViewComponent = ({ logo }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    return (
        <img
            className={classes.root}
            height={isMobile ? '64px' : '96px'}
            src=""
            alt=""
            {...imgProps[logo]}
        />
    );
};
