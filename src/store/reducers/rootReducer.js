import {combineReducers} from 'redux';

import myPokemons from './myPokemonsReducer';
import activePokemon from './activePokemonReducer';
import wildPokemon from './wildPokemonReducer';

const rootReducer = combineReducers({
    myPokemons,
    wildPokemon,    
    activePokemon,
});

export default rootReducer;