const initialState = [];

const myPokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'myPokemons/loaded':
            return [...action.payload.data];

        case 'myPokemons/added':
            return [
                ...state, 
                action.payload.data
            ];

        case 'myPokemons/released':
            return [...state,].filter((pokemon) => {
                return pokemon.id != action.payload.id
            });
    
        default:
            return state;
    }
}

export default myPokemonsReducer;