const initialState = {
    offset: 0,
    limit: 20,
    pokemons: [],
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'wildPokemon/setPokemons':
            return {
                ...state,
                pokemons: payload.pokemons
            }

        case 'wildPokemon/setPageNext':
            return {
                ...state,
                offset: state.offset + state.limit
            }

        case 'wildPokemon/setPagePrevious':
            return {
                ...state,
                offset: state.offset - state.limit 
            }


        case 'wildPokemon/pageReset':
            return {
                ...state,
                offset: 0,
            }

        default:
            return state;
    }
}