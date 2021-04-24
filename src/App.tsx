import React, { useContext, useEffect } from 'react';
import Login from './components/Login';
import User from './components/User';
import GlobalStyle from './styles/GlobalStyles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Message from './components/Message';
import auth from './auth';
import { Context } from './UserProvider';
import jwtDecode from 'jwt-decode';
import MyProfile from './components/MyProfile';

function App() {
  const [user, setUser] = useContext(Context)
  const userObj = auth.isAuthenticated()

  useEffect(() => {
    userObj && setUser(jwtDecode(userObj))
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/u/:id" exact>
          <User/>
        </Route>

        <Route path="/f/:id" exact>
          <Message/>
        </Route>

        <Route path="/" exact>
          <MyProfile/>
        </Route>

        <Route path="/login" exact>
          <Login/>
        </Route>

        <Route path="/notfound" exact>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{fontFamily: "monospace"}}>not found</h1>
            <Link to ="/">
              <a style={{color: "#000"}} href="">return</a>
            </Link>
          </div>
        </Route>
      </Switch>
      <GlobalStyle/>
    </Router>
  );
}

export default App;
