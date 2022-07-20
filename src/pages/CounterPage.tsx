import React from 'react';
import logo from '../assets/svg/logo.svg';
import { Counter } from '../features/counter/Counter';
import '../css/CounterPage.css';
import { Helmet } from 'react-helmet-async';
import botwTfLogo from '../assets/svg/triforce.svg';
import styled from 'styled-components';

function CounterPage() {
  const Styledlogo = styled('img')`
    height: 20rem;
    margin: 0.5rem;
  `;

  const StyledContainer = styled('div')`
    & h2 {
      font-family: 'The Wild Breath of Zelda', sans-serif;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
  `;
  return (
    // Classnames are maintained from the Redux original page.
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
