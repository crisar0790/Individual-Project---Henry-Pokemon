import {
    FILTER_CREATED,
    FILTER_POKEMON,
    GET_POKEMONS,
    GET_TYPES,
    ORDER,
    SEARCH_POKEMON,
    CREATE_POKEMON,
    GET_POKEMON_DETAIL
} from "../actions/actionsTypes";

const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    filterdPokemons: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                filterdPokemons: action.payload
            };
        case FILTER_POKEMON:
            const typeFiltered = state.allPokemons > state.filterdPokemons ?
                action.payload === 'all' ? state.filterdPokemons : state.filterdPokemons.filter(p => p.type.find(t => t === action.payload)) :
                action.payload === 'all' ? state.allPokemons : state.allPokemons.filter(p => p.type.find(t => t === action.payload))
            return {
                ...state,
                pokemons: typeFiltered ? typeFiltered : state.filterdPokemons
            };
        case FILTER_CREATED:
            const createdFilter = state.allPokemons > state.filterdPokemons ?
                action.payload === 'created' ? state.filterdPokemons.filter(p => isNaN(p.id)) : state.filterdPokemons.filter(p => !isNaN(p.id)) :
                action.payload === 'created' ? state.allPokemons.filter(p => isNaN(p.id)) : state.allPokemons.filter(p => !isNaN(p.id))
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.filterdPokemons : createdFilter
            };
        case ORDER:
            let sortArray = [];
            console.log(action.payload);
            if(action.payload === 'asc') {
                sortArray = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            } else if (action.payload === 'desc') {
                sortArray = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            } else if (action.payload === 'desc attack') {
                sortArray = state.pokemons.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                })
            } else if (action.payload === 'asc attack') {
                sortArray = state.pokemons.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                pokemons: action.payload === '' ? state.allPokemons : sortArray
            };
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: [action.payload]
            };
        case CREATE_POKEMON:
            return {
                ...state
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                detail: [action.payload]
            }
        default: 
            return state;
    }
}


export default rootReducer;