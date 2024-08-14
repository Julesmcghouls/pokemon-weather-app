import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import WeatherCard from './components/WeatherCard';
import PokemonCard from './components/PokemonCard';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  const fetchWeatherData = async (city) => {
    const apiKey = 'c2156068a85ae64da9bfe3c9514403fe'; // Your Weatherstack API key
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const fetchPokemonData = async (type) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const pokemonList = response.data.pokemon;
      const randomPokemon =
        pokemonList[Math.floor(Math.random() * pokemonList.length)];
      return randomPokemon.pokemon;
    } catch (error) {
      console.error("Error fetching Pokémon data", error);
    }
  };

  const mapWeatherToPokemonType = (condition) => {
    if (condition.includes('rain')) return 'water';
    if (condition.includes('sunny')) return 'fire';
    if (condition.includes('snow')) return 'ice';
    if (condition.includes('cloud')) return 'flying';
    return 'normal';
  };

  const handleSearch = async () => {
    const weatherData = await fetchWeatherData(city);
    
    if (weatherData && weatherData.current && weatherData.current.weather_descriptions) {
      setWeather(weatherData);
  
      const weatherCondition = weatherData.current.weather_descriptions[0].toLowerCase();
      const pokemonType = mapWeatherToPokemonType(weatherCondition);
      const pokemonData = await fetchPokemonData(pokemonType);
      setPokemon(pokemonData);
    } else {
      console.error("Incomplete weather data", weatherData);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">PokeWeather</h1>
      <Form className="mb-4">
        <Form.Group controlId="cityInput">
          <Form.Label>Enter City:</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      {weather && <WeatherCard weather={weather} />}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </Container>
  );
}

export default App;
