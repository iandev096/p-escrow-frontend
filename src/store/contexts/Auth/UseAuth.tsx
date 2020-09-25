import React, { useState, useCallback, useEffect } from "react";
import { AuthProps, authInit, authUser } from "./AuthProviderTypes";
import { AuthApi } from "../../../api/auth";
import { JWTService } from "../../../utilities/jwt";

const authApi = new AuthApi();

const useAuth = () => {
  const [user, setUser] = useState<
    Partial<authUser>
  >(null);
  const [auth, setAuth] = useState<AuthProps>(authInit);

  const initHandler = useCallback(async () => {
    try {
      const user = JWTService.getUserAfterDecode();
      if (user) setUser(user);
    } catch (err) {
      throw err;
    }
  }, [setUser]);

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  const authStateChanged = (jwt: string, user?: any) => {
    JWTService.clearJWT();
    JWTService.setJWT(jwt);
    setUser(JWTService.getUserAfterDecode());
  };

  const authSignupHandler = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      const res = await authApi.signUp({ email, password, fullName });
      authStateChanged(res.jwt, res.user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const authLoginHandler = async (email: string, password: string) => {
    try {
      const res = await authApi.login({ email, password });
      authStateChanged(res.jwt, res.user);
    } catch (err) {
      throw err;
    }
  };

  const authLogoutHandler = () => {
    console.log('called logout')
    setUser(null);
    JWTService.clearJWT();
  };

  useEffect(() => {
    setAuth({
      user,
      init: initHandler,
      login: authLoginHandler,
      signup: authSignupHandler,
      logout: () => {
        authLogoutHandler()
      },
    });
  }, [user]);

  return { auth: auth };
};

export default useAuth;
