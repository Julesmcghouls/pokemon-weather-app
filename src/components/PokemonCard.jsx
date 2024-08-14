import React from 'react';

function PokemonCard({ pokemon }) {
const pokemonId = pokemon.url.split('/').filter(Boolean).pop(); // Extract ID from URL

return (
<div className="card">
    <div className="card-body">
    <h5 className="card-title text-capitalize">{pokemon.name}</h5>
    <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={pokemon.name}
        className="img-fluid"
    />
    </div>
</div>
);
}

export default PokemonCard;
