import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import Router from "next/router";

class MyApp extends App {
  componentDidMount() {
    this.checkCookie();
  }

  getCookie = cname => {
    let name = cname + "=";
    let ca;
    if (process.browser) {
      ca = document.cookie.split(";");
    }
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  checkCookie = () => {
    let user = this.getCookie("username");
    if (user !== "") {
      if (Router.pathname === "/login") {
        Router.replace("/");
      }
    } else {
      if (Router.pathname !== "/signup" && Router.pathname !== "/login") {
        Router.replace("/login");
        alert("Session Expired. Please Login again");
      }
    }
  };
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
