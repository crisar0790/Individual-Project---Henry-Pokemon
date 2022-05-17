import React from "react";
import { Link } from "react-router-dom";
import { getPokemons, deletePokemon } from '../actions';
import { useDispatch } from "react-redux";
import '../styles/Card.css'

export default function Card({ id, image, name, type }) {

    const dispatch = useDispatch();

    function handleDelete(id) {
        dispatch(deletePokemon(id));
        alert('Pokémon eliminado. Aguarde hasta que se visualicen los cambios.');
        dispatch(getPokemons());
    }

    return (
        <div className='card'>
            <div>
                <div className='cover'>
                    <img src={image} alt='img pokemon' />
                </div>
                <div className='description'>
                    <h3>{name}</h3>
                    <div>
                        {
                            type?.map((type) => (
                                <h4 className={[type]}>{type}</h4>
                            ))
                        }
                    </div>
                    <div className='buttons'>
                        <Link to={'/home/' + id}>
                            <button className='button' type='button'>Ver detalles</button>
                        </Link>
                        {isNaN(id) && <button className='buttonDelete' onClick={() => handleDelete(id)}>Eliminar</button>} 
                    </div>
                </div>
            </div>
        </div>
    )
} 