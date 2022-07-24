// React
import React from 'react';
// Helmet
import { Helmet } from 'react-helmet-async';
// Slice
import { Counter } from '../features/counter/Counter';
// CSS
import '../css/CounterPage.css';
// Assets
import logo from '../assets/svg/logo.svg';
import botwTfLogo from '../assets/svg/triforce.svg';
import styled from 'styled-components';

//
// Styled Functions
//
const Styledlogo = styled('img')`
  height: 20rem;
  margin: 0.5rem;
  @media screen and (orientation: portrait) {
    height: 15rem;
  }
`;

const StyledContainer = styled('div')`
  & h2 {
    font-family: 'The Wild Breath of Zelda', sans-serif;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0 2rem 0;
  padding: 1rem;
  @media screen and (orientation: portrait) {
    min-width: unset;
    background-attachment: initial;
    max-width: 88vw;
  }
`;

//
// Functions
//
function CounterPage() {
  // Default
  // Esta función proviene del scaffolding de Redux y se ha aprovechado, con
  // algunas alteraciones, a modo de easter egg.
  return (
    // ClassNames y estilo se han mantenido desde la página original de Redux
    <>
      <StyledContainer className="zelda-window">
        <Styledlogo src={botwTfLogo} alt="Triforce Logo" />
        <h2>Contratulations!</h2>
        <p>You found the Triforce Easter Egg and the Redux Counter Page 😛</p>
      </StyledContainer>
      <div className="counter-page">
        <Helmet>
          <title>BOTW Vade Mecum: The Hidden Counter Page</title>
        </Helmet>
        <div className="zelda-window counter-page-header">
          <img src={logo} className="counter-logo" alt="logo" />
          <Counter />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="counter-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="counter-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="counter-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="counter-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default CounterPage;
