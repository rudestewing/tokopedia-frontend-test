import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import WildPokemonCard from './WildPokemonCard';

const PokemonList = (props) => {
    const {pokemons} = props;

    return (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10">
            {
                pokemons.length ? 
                    pokemons.map((pokemon, index) => {
                        let {sprites, name, owned_count} = pokemon;
                        
                        return (
                            <Link key={index} to={`/pokemon-detail/${pokemon.id}`} className="block">
                                <WildPokemonCard 
                                    sprites={sprites}
                                    name={name}
                                    ownedCount={owned_count}
                                />
                            </Link>
                        )
                    }) :
                    ('')         
            }
        </div>
    )
}

PokemonList.propTypes = {
    pokemons: PropTypes.array
}


export default PokemonList;