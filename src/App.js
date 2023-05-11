import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getAccessiblePlacesData } from './api/accessibilityCloudAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesReportsData } from './api/brasilAcessivelAPI';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState('');
  const [rating, setRating] = useState();
  const [assistant, setAssistant] = useState();
  const [disability, setDisability] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);


  useEffect(() => {
    setFilteredPlaces(places.filter((place) => place.rating > rating));
  }, [rating, places]);

  useEffect(() => {
    if(assistant){
      setFilteredPlaces(places.filter((place) => place.rating > 4.5 && place.distance < 2500.00));
    } else {
      setFilteredPlaces(places);
    }
  }, [assistant, places]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      async function getData() {
        const data = await getAccessiblePlacesData(coords.lat, coords.lng, type);
        const accessiblePlaces = data.reduce((acc, { properties: place, geometry }) => {
          if (!place.name) return acc;
          const rating = (place.accessibility?.accessibleWith?.wheelchair) ? 5.0 : (Math.random() * 4).toFixed(2);
          acc.push({
            id: place._id,
            name: place.name.en,
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
            rating,
            category: { name: place.category },
            accessibility: place.accessibility,
            description: place.description,
            placeWebSiteURL: place.placeWebsiteUrl,
            distance: place.distance,
            phone: place.phoneNumber,
          })
          return acc;
        }, []);
        const reportsData = await getPlacesReportsData({ places: accessiblePlaces });
        accessiblePlaces.forEach((place) => {
          const placeReport = reportsData.places.find(({ id }) => id === place.id)
          place.accessibleFeatures = placeReport.accessibleFeatures || [];
        });
        setPlaces(accessiblePlaces);
        setFilteredPlaces(accessiblePlaces);
        setIsLoading(false);
      }

      getData();
    }
  }, [bounds, type, coords]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces}
            type={type}
            setType={setType}
            rating={rating}
            setAssistant={setAssistant}
            setRating={setRating}
            disability={disability}
            setDisability={setDisability}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;