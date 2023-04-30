import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, FormControlLabel, Checkbox, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, type, setType, rating, setAssistant, setRating, disability, setDisability, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  useEffect(() => {
    switch (disability) {
      case '1':
      case '4':
        setRating(Number(2));  
        break;
      case '2':
      case '5':
        setRating(Number(3));  
        break;
      case '3':
      case '6':
        setRating(Number(4.5));  
        break;
      default:
        setRating(Number(4));
        break;
    }
  }, [disability]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Lugares acessíveis perto de você</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="disability-label">Deficiência</InputLabel>
            <Select id="disability-select" value={disability} onChange={(e) => setDisability(e.target.value)}>
              <MenuItem value="1">Paralesia parcial ou total de membros superiores</MenuItem>
              <MenuItem value="2">Paralesia parcial ou total de membros inferiores</MenuItem>
              <MenuItem value="3">Paralesia parcial ou total de todos os membros</MenuItem>
              <MenuItem value="4">Falta dos membros superiores</MenuItem>
              <MenuItem value="5">Falta dos membros inferiores</MenuItem>
              <MenuItem value="6">Falta de todos os membros</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="type-label">Tipo</InputLabel>
            <Select id="type-select" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="restaurant">Restaurantes</MenuItem>
              <MenuItem value="hotel">Hotéis</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating-label">Acessibilidade</InputLabel>
            <Select id="rating-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <MenuItem value="0">Todas</MenuItem>
              <MenuItem value="1">Acima de 1.0</MenuItem>
              <MenuItem value="2">Acima de 2.0</MenuItem>
              <MenuItem value="3">Acima de 3.0</MenuItem>
              <MenuItem value="4">Acima de 4.0</MenuItem>
              <MenuItem value="4.5">Acima de 4.5</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormControlLabel control={<Checkbox onChange={(e) => setAssistant(e.target.checked)} />} label="Assistente de Acessibilidade" />
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
