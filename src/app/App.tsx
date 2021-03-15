import { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import {
  createMuiTheme,
  ThemeProvider,
  Theme,
  responsiveFontSizes,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "components/Layout";
import Home from "features/home/Home";
import Counter from "features/counter/Counter";
import ToDoList from "features/todo/ToDoList";
import AddTodo from "features/todo/AddTodo";
import Settings from "features/settings/Settings";
import { APP_TITLE, PAGE_TODO_ADD, PAGE_USER_SIGN_IN } from "utils/constants";
import { darkTheme, lightTheme } from "theme/appTheme";
import {
  PAGE_COUNTER,
  PAGE_HOME,
  PAGE_SETTINGS,
  PAGE_TODO,
} from "utils/constants";
import SignIn from "features/user/SignIn";
import {
  getUser,
  getAccessJWT,
  isLoggedIn,
  currentUserAsync,
} from "features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const accessJWT = useSelector(getAccessJWT);
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    if (accessJWT) {
      dispatch(currentUserAsync());
    }
  }, [accessJWT, dispatch]);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
              <Route path={PAGE_HOME.path} exact component={Home} />
              <Route path={PAGE_COUNTER.path} exact component={Counter} />
              <Route path={PAGE_TODO.path} exact component={ToDoList} />
              <Route path={PAGE_TODO_ADD.path} exact component={AddTodo} />
              <Route path={PAGE_SETTINGS.path} exact component={Settings} />
              <Route path={PAGE_USER_SIGN_IN.path} exact component={SignIn} />
            </Layout>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
