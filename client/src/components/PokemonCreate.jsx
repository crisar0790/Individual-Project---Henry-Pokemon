import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from '../actions';
import '../styles/PokemonCreate.css';
import axios from "axios";
import swal from "sweetalert"

function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = 'Nombre es un parámetro requerido.';
    } else if (!/^[a-z]+$/.test(input.name)) {
        errors.name = 'El nombre sólo debe contener letras minúsculas.';
    } else if (!input.life) {
        errors.life = 'Vida es un parámetro requerido.';
    } else if (!/^([1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(input.life)) {
        errors.life = 'La vida debe tener un valor entre 1 y 200.';
    } else if (!input.attack) {
        errors.attack = 'Fuerza es un parámetro requerido.';
    } else if (!/^([1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(input.attack)) {
        errors.attack = 'La fuerza debe tener un valor entre 1 y 200.';
    } else if (!input.defense) {
        errors.defense = 'Defensa es un parámetro requerido.'
    } else if (!/^([1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(input.defense)) {
        errors.defense = 'La defensa debe tener un valor entre 1 y 200.';
    } else if (!input.speed) {
        errors.speed = 'Velocidd es un parámetro requerido.';
    } else if (!/^([1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(input.speed)) {
        errors.speed = 'La velocidad debe tener un valor entre 1 y 200.';
    } else if (!input.height) {
        errors.height = 'Altura es un parámetro requerido.';
    } else if (!/^([1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(input.height)) {
        errors.height = 'La altura debe tener un valor entre 1 y 200.';
    } else if (!input.weight) {
        errors.weight = 'Peso es un parámetro requerido.';
    } else if (!/^([1-9]|[1-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|10000)$/.test(input.weight)) {
        errors.weight = 'El peso debe tener un valor entre 1 y 10000.';
    } else if (!input.image) {
        errors.image = 'Imagen es un parámetro requerido.';
    } else if (!/https?:\/\/[^.]*?(\.[^.]+?)*\/.*?\.(jpg|jpeg|gif|png|svg)/g.test(input.image)) {
        errors.image = 'La URL de imagen debe tener un formato válido.';
    } else if (input.type.length < 1 || input.type.length > 2) {
        errors.type = 'Debe elegir al menos un tipo y como máximo dos.';
    }

    return errors;
}

export default function PokemonCreate() {

    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);

    const [input, setInput] = useState({
        name: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        type: []
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        if (input.type.length > 0) {
            if (input.type.includes(e.target.value)) {
                setInput({
                    ...input
                })
            } else {
                setInput({
                    ...input,
                    type: [...input.type, e.target.value]
                })
            }
        } else {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        }
    }

    function handleDelete(t) {
        setInput({
            ...input,
            type: input.type.filter(el => el !== t)
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.get(`http://localhost:3001/pokemons?name=${input.name}`);
            alert('Ya existe un pokemon con ese nombre');
        } catch (error) {
            dispatch(createPokemon(input));
            swal("¡Pokémon creado! Aguarde unos instantes para ver su pokémon en Home", {
                icon: "success",
              });
            setInput({
                name: '',
                life: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                image: '',
                type: []
            });
            history.push('/home');
        }
    }

    useEffect(() => {
        if (
            !errors.hasOwnProperty("name") &&
            !errors.hasOwnProperty("life") &&
            !errors.hasOwnProperty("attack") &&
            !errors.hasOwnProperty("defense") &&
            !errors.hasOwnProperty("speed") &&
            !errors.hasOwnProperty("height") &&
            !errors.hasOwnProperty("weight") &&
            !errors.hasOwnProperty("image") &&
            input.type.length >= 1 &&
            input.type.length <= 2 
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [errors, input, disabled]);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className='formContainer'>
            <div>
                <Link to='/home'>
                    <button className='button'>Ir a Home</button>
                </Link>
                <h2>¡Creá tu propio pokémon!</h2>
            </div>
            <form className='formCreate' onSubmit={e => handleSubmit(e)}>
                <div className='form'>
                    <div>
                        <label>Nombre: </label>
                        <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                        {
                            errors.name &&
                            (<p>{errors.name}</p>)
                        }
                    </div>
                    <div>
                        <label>Vida: </label>
                        <input type='number' placeholder='Nro. entero del 1 al 200' value={input.life} name='life' onChange={e => handleChange(e)} />
                        {
                            errors.life &&
                            (<p>{errors.life}</p>)
                        }
                    </div>
                    <div>
                        <label>Fuerza: </label>
                        <input type='number' placeholder='Nro. entero del 1 al 200' value={input.attack} name='attack' onChange={e => handleChange(e)} />
                        {
                            errors.attack &&
                            (<p>{errors.attack}</p>)
                        }
                    </div>
                    <div>
                        <label>Defensa: </label>
                        <input type='number' placeholder='Nro. entero del 1 al 200' value={input.defense} name='defense' onChange={e => handleChange(e)} />
                        {
                            errors.defense &&
                            (<p>{errors.defense}</p>)
                        }
                    </div>
                    <div>
                        <label>Velocidad: </label>
                        <input type='number' placeholder='Nro. entero del 1 al 200' value={input.speed} name='speed' onChange={e => handleChange(e)} />
                        {
                            errors.speed &&
                            (<p>{errors.speed}</p>)
                        }
                    </div>
                    <div>
                        <label>Altura: </label>
                        <input type='number' placeholder='Nro. entero del 1 al 200' value={input.height} name='height' onChange={e => handleChange(e)} />
                        {
                            errors.height &&
                            (<p>{errors.height}</p>)
                        }
                    </div>
                    <div>
                        <label>Peso: </label>
                        <input type='number' placeholder='Nro. entero del 1 al 10000' value={input.weight} name='weight' onChange={e => handleChange(e)} />
                        {
                            errors.weight &&
                            (<p>{errors.weight}</p>)
                        }
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input type='text' placeholder='URL de imagen' value={input.image} name='image' onChange={e => handleChange(e)} />
                        {
                            errors.image &&
                            (<p>{errors.image}</p>)
                        }
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <select onChange={e => handleSelect(e)}>
                            <option value='Ninguno' disabled selected>Seleccionar...</option>
                            {allTypes?.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                        {input.type.map(t =>
                            <div>
                                <span>{t}</span> <button className='buttonDelete' onClick={() => handleDelete(t)}>X</button>
                            </div>
                        )}
                        {
                            ((input.type.length < 1 || input.type.length > 2) && errors.type) &&
                            (<p>{errors.type}</p>)
                        }
                    </div>
                </div>
                <br />
                <div>
                    {
                        disabled === false ?
                            (<button className='buttonCreate' type='submit' disabled={disabled}>Crear Pokemon</button>) :
                            (<button className='disabled' type='submit' disabled={disabled}>Crear Pokemon</button>)
                    }
                </div>
            </form>
        </div>
    )
}

