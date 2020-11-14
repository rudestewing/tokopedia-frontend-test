const initialState = [];

const myPokemonsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'myPokemons/loaded':
            return [...payload.pokemons];

        case 'myPokemons/added':
            console.log('added bro');
            return [
                ...state, 
                {
                    ...payload.pokemon
                }
            ];

        case 'myPokemons/pokemonUpdated':
            return [
                ...state
            ].map((pokemon) => {
                if(pokemon.id === payload.id) {
                    return {
                        ...payload.pokemon
                    }
                }
                return pokemon;
            })

        case 'myPokemons/released':
            return [...state,].filter((pokemon) => {
                return pokemon.id != payload.id
            });
    
        default:
            return state;
    }
}

export default myPokemonsReducer;