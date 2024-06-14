import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const apiKey = 'AIzaSyACWUZ9OL8BQVQC-4cSsSFmEo71SLDzvlk';
var lang = 'en';

const Container = styled.div`
  position: relative;
  height: 250px;
  margin: 2em;
`;

const PlaceName = styled.h4`
color: #000000;
font-weight: 600;
font-size: 15px;
`;

const mapStyles = {
  width: '100%',
  height: '100%',
};

const googleMapStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

// eslint-disable-next-line react/prop-types
const MapContainer = ({ google, latitude, longitude, name }) => {
  const themeState = useSelector(state => state.themeReducer);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false); // Hides or the shows the infoWindow
  const [activeMarker, setActiveMarker] = useState({}); // Shows the active marker upon click
  const [selectedPlace, setSelectedPlace] = useState({}); // Shows the infoWindow to the selected place upon a marker

  // eslint-disable-next-line no-unused-vars
  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const mapLoaded = (mapProps, map) => {
    map.setOptions({
      styles: themeState === 'dark' ? googleMapStyles : [],
    });
  };

  return (
    <Container>
      {}
      <Map
        google={google}
        zoom={12}
        style={mapStyles}
        onReady={(mapProps, map) => mapLoaded(mapProps, map)}
        initialCenter={{
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }}
        center={{
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }}
      >
        <Marker
          name={name}
          position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
          title={name}
        />
        {console.log('latitude', latitude, longitude)}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
          {console.log("SelectedPlace", selectedPlace)}
            <PlaceName>{selectedPlace.name}</PlaceName>
          </div>
        </InfoWindow>
      </Map>
    </Container>
  );
};

export default GoogleApiWrapper(props => ({
  apiKey,
  language: props.language,
}))(MapContainer);
