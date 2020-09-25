import 'reflect-metadata';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import React from "react";
import "../../styles/global.css";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { AuthProvider } from "../store/contexts/Auth/AuthProvider";


// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ThemeProvider>
      <CSSReset />
      <ColorModeProvider>
        <AuthProvider>
          <AlertProvider template={AlertTemplate} {...options}>
            <Component {...pageProps} />
          </AlertProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
}
export default App;
