import axios from 'axios';
import swal from 'sweetalert';
import { FILTER_CREATED, FILTER_TYPE, GET_POKEMONS, GET_TYPES, ORDER, SEARCH_POKEMON, CREATE_POKEMON, GET_POKEMON_DETAIL, DELETE_POKEMON } from './actionsTypes';

export function getTypes() {
    return async function (dispatch) {
        try {
            const res = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: GET_TYPES,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export function getPokemons() {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3001/pokemons");
            return dispatch({
                type: GET_POKEMONS,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}



export const filterByType = (payload) => {
    return {
        type: FILTER_TYPE,
        payload
    }
};

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    }
};

export const order = (payload) => {
    return {
        type: ORDER,
        payload
    }
};

export function searchPokemon(name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: SEARCH_POKEMON,
                payload: res.data
            })
        } catch (error) {
            swal("No se ha encontrado un pokemon con el nombre ingresado", {
                icon: "error",
              });
        }
    }
};

export function createPokemon(payload) {
    return async function (dispatch) {
        try {
            const res = await axios.post('http://localhost:3001/pokemons', payload);
            return dispatch({
                type: CREATE_POKEMON,
                payload: res.data
            })
        } catch (error) {
            alert('Lamentablemente su pokemon no pudo ser creado porque ya existe uno con ese nombre. Intente nuevamente con un nombre diferente.');
        }
    }
}

export function getPokemonDetail(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function clearPokemonDetail() {
    return {
        type: GET_POKEMON_DETAIL,
        payload: undefined
    }
}

export function deletePokemon(id) {
    return function (dispatch) {
        return axios.delete(`http://localhost:3001/pokemons/delete/${id}`)
            .then(res => dispatch({ type: DELETE_POKEMON }))
            .catch(e => console.log(e))
    }
}
