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
  Button
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
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BasicAuth = ({register, classes, control, prefix}) => {
  const getName = useCallback(name => buildName(prefix, name), [prefix]);
  return (
    <>
    <div>
      <TextField inputRef={register} name={getName('username')} label="Username" />
    </div>
    <div>
      <TextField inputRef={register} name={getName('password')} label="Password" />
    </div>
    </>
  );
}

const EdaEndpoint = ({ register, classes, control, watch, prefix }) => {

  const getName = useCallback(name => buildName(prefix, name), [prefix]);
  const authValue = watch(getName('auth.type'));
  
  return (
    <>
    <div>
        <FormControl className={classes.formControl}>
          <InputLabel id={getName('method-label')}>
            Method
          </InputLabel>
          <Controller
            as={
              <Select
                labelId={getName('method-label')}
                className={classes.selectEmpty}
              >
                <MenuItem value={httpVerbs.PUT}>{httpVerbs.PUT}</MenuItem>
                <MenuItem value={httpVerbs.GET}>{httpVerbs.GET}</MenuItem>
                <MenuItem value={httpVerbs.POST}>{httpVerbs.POST}</MenuItem>
                <MenuItem value={httpVerbs.DELETE}>{httpVerbs.DELETE}</MenuItem>
              </Select>
            }
            name={getName('method')}
            control={control}
            defaultValue={httpVerbs.PUT}
          />
        </FormControl>
      </div>
      <div>
        <TextField inputRef={register} name={getName("uri")} label="Uri" />
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id={getName('auth-label')}>
            Authentication
          </InputLabel>
          <Controller
            as={
              <Select
                labelId={getName('auth-label')}
                className={classes.selectEmpty}
              >
                <MenuItem value={authTypes.None}>{authTypes.None}</MenuItem>
                <MenuItem value={authTypes.Basic}>{authTypes.Basic}</MenuItem>
                <MenuItem value={authTypes.Oidc}>{authTypes.Oidc}</MenuItem>
              </Select>
            }
            name={getName('auth.type')}
            control={control}
            defaultValue={authTypes.None}
          />
        </FormControl>
      </div>
      {authValue == authTypes.Basic && <BasicAuth register={register} prefix={getName('auth')} />}
    </>
  );
};

export default function EdaForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors, watch, control } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const hasCallback = watch("hasCallback");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField inputRef={register} name="eventName" label="Event name" />
      </div>
      <div>
        <TextField
          inputRef={register}
          name="subscriberName"
          label="Subscriber name"
        />
      </div>
      <div>
        <FormControlLabel
          control={<Switch name="hasCallback" inputRef={register} />}
          label="Contains Callback?"
        />
      </div>
      {hasCallback && <EdaEndpoint register={register} classes={classes} control={control} watch={watch} prefix="callback"/>}


      <Button type="submit" variant="contained" color="secondary">Submit</Button>
    </form>
  );
}
