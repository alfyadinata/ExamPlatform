import React from "react";
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from "react-router-dom";
import Sidebar from "components/layout/Sidebar";
import Header from "components/layout/Header";
import Login from "container/Login";
import Dashboard from "container/Dashboard";
import Settings from "container/Settings";
import { useSelector } from "react-redux";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";
import alertify from "alertifyjs";
import Exam from "container/Exam";

alertify.defaults = {
  notifier: {
    position: "top-right",
    delay: 3000,
  },
};

const App = () => {
  const user = useSelector((state) => state.currentUser);
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route>
          {user ? (
            <div className="flex h-screen bg-gray-200">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                  <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/exam" component={Exam} />
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </main>
              </div>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
