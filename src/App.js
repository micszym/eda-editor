import React, { useState } from 'react';
import './App.css';
import EdaForm from './Form/EdaForm';
import { CssBaseline, Paper, AppBar, Toolbar, Typography, Box, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrintJson from './Form/PrintJson';
import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

const useStyles = makeStyles((theme) => ({
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

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#68C5B8',
    }    
  },  
});

function App() {
  const classes = useStyles();
  const [formData, setFormData] = useState();

  const buildScopes = (scopes) => {
    if (!!!scopes) {
      return undefined;
    }

    return scopes.split(" ");
  }

  const buildEndpoints = (form) => {
    if (!!!form) {
      return [];
    }

    return ([{
      uri: form.uri,
      httpVerb: form.method,
      selector: "*",
      authentication: {
        ...form.auth,
        scopes: buildScopes(form.auth.scopes)
      }
    }]);
  }

  const buildJson = (form) => {
    const json = {
      subscriberName: form.subscriberName,
      eventName: form.eventName,
      subscriber: {
        webhooks: {
          endpoints: buildEndpoints(form.webhook)
        },
        callbacks: {
          endpoints: buildEndpoints(form.callback)
        },
        dlq: {
          endpoints: buildEndpoints(form.dlq)
        }
      }
    };
    setFormData(json);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="absolute" color="white" className={classes.appBar}>
          <Toolbar>
            <Box display="flex" alignItems="baseline">
              <img
                src="https://www.eshopworld.com/wp-content/themes/esw2018/img/logo_eshopworld@2x.png"
                height="20"
              />
              <Typography
                variant="h6"
                color="secondary"
                noWrap
                style={{ marginLeft: 10 }}
              >
                Subscriber self-service v0.1
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {!!!formData && <EdaForm setFormData={buildJson} />}
            {!!formData && (
              <PrintJson json={formData} clear={() => setFormData("")} />
            )}
          </Paper>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
