import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from '../actions';


export default function PokemonCreate() {

    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);
    const history = useHistory();

    const [input, setInput] = useState({
        name: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: '',
        type: []
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
    }

    function handleDelete(t) {
        setInput({
            ...input,
            type: input.type.filter(el => el !== t)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createPokemon(input));
        alert('¡Pokemon creado!');
        setInput({
            name: '',
            life: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            image: '',
            type: []
        });
        history.push('/home');
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            <Link to='/home'>
                <button>Ir a Home</button>
            </Link>
            <h2>¡Creá tu propio pokemon!</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Vida: </label>
                    <input type='number' value={input.life} name='life' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Fuerza: </label>
                    <input type='number' value={input.attack} name='attack' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Defensa: </label>
                    <input type='number' value={input.defense} name='defense' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Velocidad: </label>
                    <input type='number' value={input.speed} name='speed' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Altura: </label>
                    <input type='number' value={input.height} name='height' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Peso: </label>
                    <input type='number' value={input.weight} name='weight' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Imagen: </label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Tipo: </label>
                    <select onChange={e => handleSelect(e)}>
                        <option value='' disabled selected>Seleccionar...</option>
                        {allTypes?.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                    
                        {input.type.map(t =>
                            <div>
                            <span>{t}</span> <button onClick={() => handleDelete(t)}>X</button>
                            </div>
                            )}
                    
                </div>
                <button type='submit'>Crear Pokemon</button>
            </form>
        </div>
    )
}