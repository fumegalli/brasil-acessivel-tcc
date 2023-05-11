import { useState } from 'react';
import {
  Modal,
  Box,
  FormGroup,
  Typography,
  FormControlLabel,
  Button,
  Checkbox
} from '@material-ui/core';

import useStyles from './styles.js'
import { createReport } from '../../api/brasilAcessivelAPI.js';

const ReportAccessibility = ({ isOpen, handleClose, placeName, placeId, handleSuccessSnackbar, handleErrorSnackbar }) => {
  const [blindness, setBlindness] = useState(false);
  const [guideDog, setGuideDog] = useState(false);
  const [hearingImpairment, setHearingImpairment] = useState(false);
  const [learningImpairment, setLearningImpairment] = useState(false);
  const [mobilityImpairment, setMobilityImpairment] = useState(false);
  const [muteness, setMuteness] = useState(false);
  const [visualImpairment, setVisualImpairment] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  
  const classes = useStyles();

  function cleanForm() {
    setBlindness(false);
    setGuideDog(false);
    setHearingImpairment(false);
    setLearningImpairment(false);
    setMobilityImpairment(false);
    setMuteness(false);
    setVisualImpairment(false);
    setWheelchair(false);
  }

  async function onSubmit() {
    try {
      await createReport({
        placeId,
        blindness,
        guideDog,
        hearingImpairment,
        learningImpairment,
        mobilityImpairment,
        muteness,
        visualImpairment,
        wheelchair,
      });

      handleSuccessSnackbar(true);
    } catch(error) {
      handleErrorSnackbar(true);
    } finally {
      handleClose();
      cleanForm();
    }
  }

  return (
    <Modal
      className={classes.modal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpen}
      onClose={handleClose}
    >
      <Box className={classes.container}>
        <Typography className={classes.title} gutterBottom variant="h5">{placeName}</Typography>
        <div className={classes.divider}/>
        <FormGroup className={classes.formGroup}>
          <Typography gutterBottom variant="h6">Local é acessível para:</Typography>
          <FormControlLabel control={<Checkbox onChange={e => setBlindness(e.target.checked)} />} label="Pessoas que não enxergam" />
          <FormControlLabel control={<Checkbox onChange={e => setGuideDog(e.target.checked)} />} label="Cão Guia" />
          <FormControlLabel control={<Checkbox onChange={e => setHearingImpairment(e.target.checked)} />} label="Pessoa com baixa audição" />
          <FormControlLabel control={<Checkbox onChange={e => setLearningImpairment(e.target.checked)} />} label="Pessoa com dificuldades cognitivas" />
          <FormControlLabel control={<Checkbox onChange={e => setMobilityImpairment(e.target.checked)} />} label="Pessoa com baixa mobilidade" />
          <FormControlLabel control={<Checkbox onChange={e => setMuteness(e.target.checked)} />} label="Pessoa que não fala" />
          <FormControlLabel control={<Checkbox onChange={e => setVisualImpairment(e.target.checked)} />} label="Pessoa com baixa visão" />
          <FormControlLabel control={<Checkbox onChange={e => setWheelchair(e.target.checked)} />} label="Pessoa que usa cadeira de rodas" />
          <div className={classes.actionsContainer}>
            <Button className={classes.cancelButton} color="secondary" variant="contained" onClick={handleClose}>Cancelar</Button>
            <Button color="primary" variant="contained" onClick={onSubmit}>Avaliar</Button>
          </div>
        </FormGroup>
      </Box>
    </Modal>
  )
}


export default ReportAccessibility;