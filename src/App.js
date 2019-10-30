import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import sunnyIcon from './assets/icons/sunny.svg';
import './App.css';
import CityList from './components/CityList';
import SingleCity from './components/SingleCity';

function App() {
  return (
    <Router>
      <main>
        <header>
          <Link to="/">
            <img src={sunnyIcon} alt="OpenWeatherMap" />
            <h1>OpenWeatherMap</h1>
          </Link>
        </header>

        <Switch>
          <Route path="/city-details/:city">
            <SingleCity />
          </Route>
          <Route path="/">
            <CityList />
          </Route>
        </Switch>
      </main>

      <footer>
        Made by <a href="https://www.linkedin.com/in/sarea-alkebaly/" target="_blank" rel="noopener noreferrer">Sarea</a> & <a href="https://www.linkedin.com/in/pbremer/" target="_blank" rel="noopener noreferrer">Paul</a>, Powered by <a  href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>
      </footer>
    </Router>
  );
}

export default App;
