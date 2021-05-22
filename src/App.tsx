import { Switch, Route } from 'react-router-dom';
import { useReducer } from 'react';
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
  ThemeProvider,
} from '@material-ui/core';
import Layout from './components/Layout';
import {
  PAGE_COUNTER,
  PAGE_HOME,
  PAGE_SIGN_IN,
  PAGE_TODO,
} from './utils/constants';
import Home from './features/home/Home';
import Todo from './features/todo/Todo';
import Counter from './features/counter/Counter';
import PrivateRoute from './components/PrivateRoute';
import { darkTheme, lightTheme } from './theme/appTheme';
import SignIn from './features/signIn/SignIn';

const App = () => {
  const isLoggedIn = true;
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
          <Route path={PAGE_HOME.path} exact component={Home} />
          <Route path={PAGE_SIGN_IN.path} exact component={SignIn} />
          <Route
            path="/(.+)"
            render={() => (
              <Switch>
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_TODO.path}
                  exact
                  component={Todo}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_COUNTER.path}
                  exact
                  component={Counter}
                />
              </Switch>
            )}
          />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
