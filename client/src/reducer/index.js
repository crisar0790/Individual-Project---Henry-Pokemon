import {
    FILTER_CREATED,
    FILTER_TYPE,
    GET_POKEMONS,
    GET_TYPES,
    ORDER,
    SEARCH_POKEMON,
    CREATE_POKEMON,
    GET_POKEMON_DETAIL,
    DELETE_POKEMON
} from "../actions/actionsTypes";
import { filterPokemons, orderPokemons } from "../utils";

const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    filteredByType: 'all',
    filteredType: [],
    filteredByCreated: 'all',
    filteredCreated: [],
    pokemonsByOrder: '',
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
                allPokemons: action.payload
            };
        case FILTER_TYPE: {
            let pokemonsFiltered = filterPokemons(state.allPokemons, state.filteredByCreated, action.payload);
            let pokemonsOrdered = orderPokemons(pokemonsFiltered, state.pokemonsByOrder);
            return {
                ...state,
                pokemons: pokemonsOrdered,
                filteredByType: action.payload
            };
        }
        case FILTER_CREATED: {
            let pokemonsFiltered = filterPokemons(state.allPokemons, action.payload, state.filteredByType);
            let pokemonsOrdered = orderPokemons(pokemonsFiltered, state.pokemonsByOrder);
            return {
                ...state,
                pokemons: pokemonsOrdered,
                filteredByCreated: action.payload
            };
        }
        case ORDER:
            let pokemonsFiltered = filterPokemons(state.allPokemons, state.filteredByCreated, state.filteredByType);
            let pokemonsOrdered = orderPokemons(pokemonsFiltered, action.payload);
            return {
                ...state,
                pokemons: pokemonsOrdered,
                pokemonsByOrder: action.payload
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
        case DELETE_POKEMON:
            return {
                ...state
            }
        default:
            return { ...state };
    }
}


export default rootReducer;