import { Button, Stack} from "@mui/material";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { fakeAuthProvider } from "../auth";
import { URLs } from "../constant/Routers";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LetterAvatars from "../atom/UserAvator";

type User = {
  userName: String
} | undefined

type AuthContextType = {
  user: User;
  signin: (user: User, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<User>();

  let signin = (newUser: User, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(undefined);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handlerOnClickSignIn = () => {
    navigate(URLs.signin)
  }

  if (!auth.user) {
    return (
    <Button variant="contained" color="secondary" onClick={handlerOnClickSignIn} startIcon={<LoginIcon />} >
      SignIn
    </Button>
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      <LetterAvatars userName={auth.user.userName}/>
      <Button
        variant="contained"
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
        startIcon={<LogoutIcon />}
        color="secondary"
      >
        Signout
      </Button>
    </Stack>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}