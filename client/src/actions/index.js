import axios from 'axios';
import { FILTER_POKEMON, GET_POKEMONS, GET_TYPES } from './actionsTypes';

export const getTypes = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/types');
        dispatch({
            type: GET_TYPES,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getPokemons = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:3001/pokemons");
        dispatch({
            type: GET_POKEMONS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const filterByType = (payload) => {
    return {
        type: FILTER_POKEMON,
        payload
    }
};


