import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage/Homepage";
import AuthPage from "./components/Auth/SignUp";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authState = useSelector((state) => state.auth.isAuth);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {authState ? <HomePage /> : <AuthPage />}
        {/* <AuthPage /> */}
        {/* <HomePage /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
