import React from 'react';

const MyPokemonCard = (props) => {
    const {pokemon} = props;

    return (
        <div className="bg-white rounded-md shadow-md overflow-hidden border relative">
            <div className="py-3">
                <img src={pokemon.sprites.front_default} alt="" className="w-24 mx-auto"/>
            </div>
            <div className="block tracking-wider font-semibold text-center py-2 mb-3">
                {pokemon.nick_name || pokemon.name}
            </div>
            {/* <div>
                {Date(pokemon.catch_time)}
            </div> */}
        </div>
    )
}

export default MyPokemonCard;