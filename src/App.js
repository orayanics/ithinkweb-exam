import "styles/main.scss";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Page } from "components/Pages";
import Home from "views/home";
import Users from "views/users";
import NotFound from "views/notfound";

import UserEditModal from "components/Users/UserEditModal";
import UserAddModal from "components/Users/UserAddModal";
import UserDeleteModal from "components/Users/UserDeleteModal";
import UserProfile from "components/Users/UserProfile";

import Loader from "views/loader";

import UsersProvider from "util/UsersProvider";
function App() {
  return (
    <UsersProvider>
      <Router>
        <ModalSwitch />
      </Router>
    </UsersProvider>
  );
}

function ModalSwitch() {
  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <div className="app">
      <Page>
        <Switch location={background || location}>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/users">
            <Suspense fallback={<Loader />}>
              <Users />
            </Suspense>
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {background && <Route path="/users/create" component={UserAddModal} />}

        {background && (
          <Route path="/users/:id/edit" component={UserEditModal} />
        )}

        {background && (
          <Route path="/users/:id/delete" component={UserDeleteModal} />
        )}

        {background && <Route path="/users/:id" component={UserProfile} />}
      </Page>
    </div>
  );
}

export default App;
