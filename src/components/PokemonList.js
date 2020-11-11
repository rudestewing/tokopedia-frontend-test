import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PokemonList = (props) => {
    const {pokemons} = props;
    
    return (
        <div className="grid gap-3 grid-cols-4 py-10">
            {
                pokemons.length ? 
                    pokemons.map((pokemon, index) => {
                        let {sprites} = pokemon;
                        
                        return (
                            <Link key={index} to={`/pokemon-detail/${pokemon.id}`} className="bg-white rounded-lg shadow-md">
                                <div>
                                    {pokemon.name}
                                </div>
                                {
                                    sprites ? 
                                        (
                                            <div>
                                                <img src={sprites.front_default} alt="" className="w-20 h-20"/>
                                            </div>
                                        ): 
                                        ('')
                                }
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