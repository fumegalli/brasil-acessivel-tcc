import { useState } from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import ReportAccessibility from '../ReportAccessibility/ReportAccessibility.js';

import useStyles from './styles.js';

const FEATURES = {
  muteness: "Pessoa que não fala",
  blindness: "Pessoas que não enxergam",
  guideDog: "Cão Guia",
  hearingImpairment: "Pessoa com baixa audição",
  learningImpairment: "Pessoa com dificuldades cognitivas",
  mobilityImpairment: "Pessoa com baixa mobilidade",
  visualImpairment: "Pessoa com baixa visão",
  wheelchair: "Pessoa que usa cadeira de rodas",
}

const PlaceDetails = ({ place }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);

  const classes = useStyles();

  function onOpenModal() {
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Button variant="outlined" onClick={onOpenModal}>Avaliar</Button>
        </Box>
        {place.accessibleFeatures?.length > 0 && <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography gutterBottom variant="h6">Local é acessível para:</Typography>
            {place.accessibleFeatures.map(({name, reportsQuantity}, index) => {
              if (reportsQuantity === 0) return null
              return (
                <Box display="flex" marginX={0} mb="5px" key={index}>
                  <Typography className={classes.feature}>{FEATURES[name]}</Typography>
                  <Typography className={classes.reportsQuantity} variant="caption" color="textSecondary"> {`(${reportsQuantity} ${reportsQuantity > 1 ? 'avaliações' : 'avaliação'})`}</Typography>
                </Box>
              )
            })}
          </Box>
        </Box>}
        <Box mt="15px">
          {place.address && (
            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
              <LocationOnIcon />{place.address}
            </Typography>
          )}
          {place.phone && (
            <Typography variant="body2" color="textSecondary" className={classes.spacing}>
              <PhoneIcon /> {place.phone}
            </Typography>
          )}
        </Box>
      </CardContent>
      <ReportAccessibility
        isOpen={isModalOpen}
        handleClose={onCloseModal}
        placeName={place.name}
        placeId={place.id}
        handleSuccessSnackbar={setIsSuccessSnackbarOpen}
        handleErrorSnackbar={setIsErrorSnackbarOpen}
      />
      <Snackbar
        open={isSuccessSnackbarOpen}
        onClose={() => setIsSuccessSnackbarOpen(false)}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert variant="filled" onClose={() => setIsSuccessSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Avaliação enviada com sucesso! 
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorSnackbarOpen}
        onClose={() => setIsErrorSnackbarOpen(false)}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert variant="filled" onClose={() => setIsErrorSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          Erro ao enviar avaliação! 
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default PlaceDetails;
