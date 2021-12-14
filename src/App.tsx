import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";

import Quiz from "./pages/Quiz";
import Registration from "./pages/Registration";
import Result from "./pages/Result";

import "./assets/css/style.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Navigation Bar in All Page */}
      <Navbar />
      {/* Routes */}
      <Switch>
        <Route exact path="/" component={Registration}></Route>
        <Route exact path="/quiz" component={Quiz}></Route>
        <Route exact path="/result" component={Result}></Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
