import React from 'react';
import { GoogleMap, MarkerClusterer, Rectangle } from '@react-google-maps/api';
import { EventsMapViewComponent } from './EventsMap.types';
import { EventMarker } from '../EventMarker';
import {
    LinearProgress,
    makeStyles,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import { SearchField } from '../SearchField';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const rectangleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    zIndex: 1
};

const useStyles = makeStyles({
    root: {
        flex: 1,
        position: 'relative'
    },
    linearProgress: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        width: '100%'
    }
});

const SWEDEN_BOUNDS = {
    north: 69.5,
    south: 55,
    west: 10,
    east: 24.5
};

export const EventsMapView: EventsMapViewComponent = ({
    isLoaded,
    onLoad,
    onUnmount,
    center,
    events,
    eventsLoading,
    onClusterClick,
    selectedMapArea,
    showSelectedArea,
    onMapClick,
    onSearchPlaceChange
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // @ts-ignore
    const googleMaps = isLoaded && window.google.maps;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {(eventsLoading || !isLoaded) && (
                <LinearProgress classes={{ root: classes.linearProgress }} />
            )}
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={
                        selectedMapArea
                            ? selectedMapArea.center
                            : { lat: center.latitude, lng: center.longitude }
                    }
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    clickableIcons={false}
                    onClick={onMapClick}
                    options={{
                        zoomControl: true,
                        zoomControlOptions: {
                            position: isMobile
                                ? googleMaps.ControlPosition.LEFT_CENTER
                                : googleMaps.ControlPosition.RIGHT_BOTTOM
                        },
                        streetViewControl: false,
                        fullscreenControl: false,
                        mapTypeControl: false,
                        restriction: {
                            latLngBounds: SWEDEN_BOUNDS,
                            strictBounds: true
                        }
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <SearchField onChange={onSearchPlaceChange} />
                        <Rectangle
                            bounds={selectedMapArea?.bounds}
                            options={{
                                ...rectangleOptions,
                                visible: showSelectedArea && !!selectedMapArea
                            }}
                        />
                        <MarkerClusterer
                            key={events
                                .map(({ remoteId }) => remoteId)
                                .join('-')}
                            gridSize={40}
                            averageCenter
                            zoomOnClick={false}
                            minimumClusterSize={1}
                            onClick={onClusterClick}
                        >
                            {(clusterer) =>
                                events.map((event) => (
                                    <EventMarker
                                        key={event.remoteId}
                                        {...event}
                                        clusterer={clusterer}
                                    />
                                ))
                            }
                        </MarkerClusterer>
                    </div>
                </GoogleMap>
            )}
        </div>
    );
};
