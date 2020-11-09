import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Member from "./pages/Member"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/signup"]}>
            <Signup />
          </Route>
          <Route exact path={["/login"]}>
            <Login />
          </Route>
          <Route exact path={["/member/:id"]}>
            <Member />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
