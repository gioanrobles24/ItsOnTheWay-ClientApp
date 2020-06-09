const ClientInfo = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
        case 'ADD_USER_INFO':
            return [...state, action.payload]
    }

    return state
}

export default ClientInfo

