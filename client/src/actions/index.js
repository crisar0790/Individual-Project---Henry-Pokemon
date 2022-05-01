import axios from 'axios';
import { FILTER_CREATED, FILTER_POKEMON, GET_POKEMONS, GET_TYPES, ORDER, SEARCH_POKEMON, CREATE_POKEMON, GET_POKEMON_DETAIL } from './actionsTypes';

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
        type: FILTER_POKEMON,
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

export function searchPokemon (name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: SEARCH_POKEMON,
                payload: res.data
            })
        } catch (error) {
            alert('Pokemon no encontrdo');
        }
    }
};

export function createPokemon (payload) {
    return async function (dispatch) {
        try {
            const res =  await axios.post('http://localhost:3001/pokemons', payload);
            return dispatch({
                type: CREATE_POKEMON,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getPokemonDetail (id) {
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