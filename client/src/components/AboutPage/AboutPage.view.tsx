import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Logo } from './components';

const styles = (theme: Theme) => ({
    root: {
        overflowY: 'scroll' as 'scroll',
        padding: theme.spacing(2)
    },
    section: {
        marginBottom: theme.spacing(3)
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    logoList: {
        display: 'inline-flex',
        width: '100%',
        maxWidth: 1600,
        justifyContent: 'space-between',
        flexWrap: 'wrap' as 'wrap'
    }
});

const useStyles = makeStyles(styles);

const technologies: Array<React.ComponentProps<typeof Logo>['logo']> = [
    'react',
    'node',
    'apollo',
    'graphql',
    'aws',
    'mongodb'
];

export const AboutPageView = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h5">
                Om Crime Radar
            </Typography>
            <div className={classes.section}>
                <Typography variant="body1">
                    Crime Radar är en webbapplikation som visar brott och andra
                    polishändelser över hela Sverige på en interaktiv karta. All
                    data är hämtad från Polisens&nbsp;
                    <a href="https://polisen.se/kontakt/om-webbplatsen/oppna-data/api-over-polisens-handelser/">
                        öppna API
                    </a>
                    &nbsp;samt&nbsp;
                    <a href="https://polisen.se/aktuellt/polisens-nyheter">
                        händelser
                    </a>
                    &nbsp;från Polisens hemsida.
                    <br />
                    <br />
                    Händelser synkroniseras med jämna mellanrum mellan Polisens
                    API och Crime Radar, vilket innebär att det kan finnas en
                    liten fördröjning från när en ny händelse publiceras hos
                    Polisen tills när den blir synlig här.
                    <br />
                    <br />
                    Syftet med Crime Radar är att erbjuda en snabb och enkel
                    överblick över händelser som har skett inom ett visst
                    område, med möjlighet att klicka sig in och se mer
                    detaljerade uppgifter om en viss händelse. Tillskillnad från
                    Polisens egna tjänst som endast visar en textbaserad lista
                    över händelser, så presenteras här händelserna på en
                    interaktiv karta och vilket gör det mer intuitivt och
                    lättöverskådligt för användaren.
                </Typography>
            </div>
            <div className={classes.section}>
                <Typography variant="h6">Platsen för händelser</Typography>
                <Typography variant="body1">
                    Platsen som visas på kartan för en händelse baseras på den
                    platsinformation som finns i Polisens API. Denna plats anger
                    inte exakt var en händelse har skett, utan visar endast
                    mittpunkten för den kommun som händelsen har inträffat i.
                </Typography>
            </div>

            <div className={classes.section}>
                <Typography className={classes.title} variant="h5">
                    Under huven på Crime Radar
                </Typography>
                <div className={classes.logoList}>
                    {technologies.map((technology) => (
                        <Logo key={technology} logo={technology} />
                    ))}
                </div>
            </div>
            <div className={classes.section}>
                <Typography variant="body2">
                    All kod finns tillgänglig på&nbsp;
                    <a href="https://github.com/toblu/crime-alert">Github</a>
                </Typography>
            </div>
            <div className={classes.section}>
                <Typography variant="h6">Skapare</Typography>
                <Typography variant="body1">
                    Crime Radar skapades som ett hobbyprojekt av&nbsp;
                    <a href="https://www.linkedin.com/in/tobiaslundell/">
                        Tobias Lundell
                    </a>
                    . Till vardags jobbar Tobias som IT-konsult inom
                    webbutveckling.
                </Typography>
            </div>
        </div>
    );
};
