import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PrintJson({ json, clear }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Config output</Typography>
      </Grid>
      <pre>{JSON.stringify(json, null, 2)}</pre>
      <Grid container justify="flex-end">
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={clear}
        >
          Clear
        </Button>
      </Grid>
    </>
  );
}
