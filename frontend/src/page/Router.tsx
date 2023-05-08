import * as React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, RequireAuth, useAuth } from "../auth/AuthProvider";
import { URLs } from "../constant/Routers";
import Layout from "./Layout";
import PrivatePage from "./Private";
import PublicPage from "./Public";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotificationSample from "./Notification";
import Chart from "./Chart";
import TestApiPage from "./API";
import CardList from "./CardList";

export default function RouterApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path={URLs.root} element={<PublicPage />} />
          <Route path={URLs.signin} element={<LoginPage />} />
          <Route path={URLs.signup} element={<SignUp />}/>
          <Route path={URLs.notification} element={<NotificationSample />}/>
          <Route path={URLs.chart} element={<Chart />}/>
          <Route path={URLs.apiTest} element={<TestApiPage />}/>
          <Route path={URLs.cardList} element={<CardList />}/>
          <Route
            path={URLs.private}
            element={
              <RequireAuth>
                <PrivatePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("userName") as string;

    auth.signin({userName: username}, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    SignIn(handleSubmit)
  );
}
