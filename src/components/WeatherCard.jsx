import React from 'react';

function WeatherCard({ weather }) {
if (!weather || !weather.current || !weather.current.condition) {
return <div>Error: Unable to fetch weather data</div>;
}

return (
<div className="card">
    <div className="card-body">
    <h5 className="card-title">{weather.location.name}</h5>
    <p className="card-text">{weather.current.condition.text}</p>
    <p className="card-text">{weather.current.temperature} °C</p>
    </div>
</div>
);
}

export default WeatherCard;
