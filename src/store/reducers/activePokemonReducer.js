const initialState = {}

const activePokemonReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'activePokemon/set':
            return {
                ...payload.pokemon
            };

        default:
            return state;
    }
}

export default activePokemonReducer;