import React from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchPokemon } from "../actions";
import '../styles/SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchPokemon(name));
        setName("");
    }

    return (
        <div className='search'>
            <input type='text' placeholder='Buscar...' onChange={(e) => handleInputChange(e)} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}