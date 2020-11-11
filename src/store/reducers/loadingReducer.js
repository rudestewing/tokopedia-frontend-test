export default (state = {
    isLoading: false
}, {type}) => {
    switch (type) {
        case 'loading/started':
            return {
                ...state,
                isLoading: true,
            }

        case 'loading/stopped': 
            return {
                ...state,
                isLoading: false
            }
    
        default:
            return state
    }
} 