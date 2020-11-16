import React from 'react';
import MyPokemonCard from '../components/MyPokemonCard';
import {Link} from 'react-router-dom';

const MyPokemonList = (props) => {
    const {pokemons} = props;
    return (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10">
            {
                pokemons.length ? 
                    pokemons.map((pokemon) => {
                        return (
                            <Link to={`/my-pokemons/${pokemon.id}`} key={pokemon.id}>
                                <MyPokemonCard pokemon={pokemon} />
                            </Link>
                        )
                    }) :
                    (
                        <div>
                            No pokemons owned, <Link to="/"> go hunt!!! </Link>
                        </div>
                    )
            }            
        </div>
    )
}

export default MyPokemonList;