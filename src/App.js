import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "components";
import { CoinList, CoinPage, Portfolio } from "pages";
import { GlobalStyle, Container, darkTheme, lightTheme } from "styling";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const isBlacked = useSelector( (state) => state.universalVariables.isBlacked )
  
  return (
    <ThemeProvider theme={isBlacked ? darkTheme : lightTheme}>
      <Container>
        <GlobalStyle />
        <Router>
          <Navbar />
          <Switch>
            
            <Route
              exact
              path="/coinpage/:coin"
              component={(props) => <CoinPage {...props} />}
            />
            <Route
              exact
              path="/"
              component={() => <CoinList />}
            />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
