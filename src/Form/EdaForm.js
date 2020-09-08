import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
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
  Typography,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const buildName = (prefix, name) => `${prefix}.${name}`;

const authTypes = {
  None: 'None',
  Basic: 'Basic',
  Oidc: 'Oidc'
};

const httpVerbs = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

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

const BasicAuth = ({ register, classes, control, prefix }) => {
  const getName = useCallback((name) => buildName(prefix, name), [prefix]);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          name={getName("username")}
          label="Username"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          name={getName("passwordKeyName")}
          label="Password Key Vault Secret"
          fullWidth
        />
      </Grid>
    </>
  );
};

const OidcAuth = ({ register, classes, control, prefix }) => {
  const getName = useCallback((name) => buildName(prefix, name), [prefix]);
  return (
    <>
      <Grid item xs={12} sm={2}>
        <FormControl>
          <InputLabel id={getName("method-label")}>Method</InputLabel>
          <Controller
            as={
              <Select
                labelId={getName("method-label")}
                className={classes.selectEmpty}
              >
                <MenuItem value={httpVerbs.PUT}>{httpVerbs.PUT}</MenuItem>
                <MenuItem value={httpVerbs.GET}>{httpVerbs.GET}</MenuItem>
                <MenuItem value={httpVerbs.POST}>{httpVerbs.POST}</MenuItem>
                <MenuItem value={httpVerbs.DELETE}>{httpVerbs.DELETE}</MenuItem>
              </Select>
            }
            name={getName("method")}
            control={control}
            defaultValue={httpVerbs.POST}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          inputRef={register}
          name={getName("stsUri")}
          label="STS Uri"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          name={getName("clientId")}
          label="Client Id"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          name={getName("clientSecret")}
          label="Client Secret Key Vault Key"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={register}
          name={getName("scopes")}
          label="Scopes (delimited by space)"
          fullWidth
        />
      </Grid>
    </>
  );
};

const EdaEndpoint = ({ register, classes, control, watch, prefix, header }) => {
  const getName = useCallback((name) => buildName(prefix, name), [prefix]);
  const authValue = watch(getName("auth.type"));

  return (
    <>
      <Grid item xs={12} sm={2}>
        <FormControl>
          <InputLabel id={getName("method-label")}>Method</InputLabel>
          <Controller
            as={
              <Select labelId={getName("method-label")}>
                <MenuItem value={httpVerbs.PUT}>{httpVerbs.PUT}</MenuItem>
                <MenuItem value={httpVerbs.GET}>{httpVerbs.GET}</MenuItem>
                <MenuItem value={httpVerbs.POST}>{httpVerbs.POST}</MenuItem>
                <MenuItem value={httpVerbs.DELETE}>{httpVerbs.DELETE}</MenuItem>
              </Select>
            }
            name={getName("method")}
            control={control}
            defaultValue={httpVerbs.PUT}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          inputRef={register}
          name={getName("uri")}
          label="Uri"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={getName("auth-label")}>Authentication</InputLabel>
          <Controller
            as={
              <Select
                labelId={getName("auth-label")}
                className={classes.selectEmpty}
              >
                <MenuItem value={authTypes.None}>{authTypes.None}</MenuItem>
                <MenuItem value={authTypes.Basic}>{authTypes.Basic}</MenuItem>
                <MenuItem value={authTypes.Oidc}>{authTypes.Oidc}</MenuItem>
              </Select>
            }
            name={getName("auth.type")}
            control={control}
            defaultValue={authTypes.None}
          />
        </FormControl>
      </Grid>
      {authValue === authTypes.Basic && (
        <BasicAuth register={register} prefix={getName("auth")} />
      )}
      {authValue === authTypes.Oidc && (
        <OidcAuth
          register={register}
          prefix={getName("auth")}
          classes={classes}
          control={control}
        />
      )}
    </>
  );
};

export default function EdaForm({setFormData}) {
  const classes = useStyles();
  const { register, handleSubmit, errors, watch, control } = useForm();
  const onSubmit = (data) => setFormData(data);
  console.log(errors);

  const hasCallback = watch("hasCallback");
  const hasDlq = watch("hasDlq");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Event details</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({required: true})}
            name="eventName"
            label="Event name"
            fullWidth
            error={errors.eventName}
            helperText={errors.eventName && 'required'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({required: true})}
            name="subscriberName"
            label="Subscriber name"
            fullWidth
            error={errors.subscriberName}
            helperText={errors.subscriberName && 'required'}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Webhook details</Typography>
        </Grid>
        <EdaEndpoint
          register={register}
          classes={classes}
          control={control}
          watch={watch}
          prefix="webhook"
          header=""
        />
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Typography variant="h6">Callback details</Typography>
            </Box>
            <FormControlLabel
              control={<Switch name="hasCallback" inputRef={register} />}
              label="Contains Callback?"
            />
          </Box>
        </Grid>
        {hasCallback && (
          <EdaEndpoint
            register={register}
            classes={classes}
            control={control}
            watch={watch}
            prefix="callback"
          />
        )}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Typography variant="h6">DLQ details</Typography>
            </Box>
            <FormControlLabel
              control={<Switch name="hasDlq" inputRef={register} />}
              label="Contains DLQ?"
            />
          </Box>
        </Grid>
        {hasDlq && (
          <EdaEndpoint
            register={register}
            classes={classes}
            control={control}
            watch={watch}
            prefix="dlq"
          />
        )}

        <Grid container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
