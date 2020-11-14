import React from 'react';

const PokemonDetailInformation = (props) => {
    const {pokemon} = props;

    return (
        <div>
            {pokemon.name}
        </div>
    )
}

export default PokemonDetailInformation;