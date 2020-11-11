const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'activePokemon/set':
            return {
                ...payload.pokemon
            };

        default:
            return state;
    }
}