import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemonDetail, getPokemonDetail } from "../actions"
import { useEffect } from "react";
import '../styles/Details.css'

export default function Details({ match }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const pokemon = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getPokemonDetail(id));
        return () => {
            dispatch(clearPokemonDetail())
        }
    }, [dispatch, id]);

    if (pokemon[0] === undefined) {
        return (
            <div className='background1'>
                <h3>CARGANDO ...</h3>
                <img src='https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif' alt='pokeball img' width='250px' />
            </div>
        )
    } else {
        return (
            <div className='background1'>
                {
                    pokemon.length === 1 ?
                        (<div className='container1'>
                            <img src={pokemon[0].image} alt={pokemon[0].name} />
                            <div className='description'>
                                <h4>Nombre: {pokemon[0].name}</h4>
                                <h4>ID: {pokemon[0].id}</h4>
                                {pokemon[0].type.length > 1 ? <h4>Tipos: {pokemon[0].type[0]}, {pokemon[0].type[1]}</h4> : <h4>Tipo: {pokemon[0].type[0]}</h4>}
                                <h4>Vida: {pokemon[0].life}</h4>
                                <h4>Fuerza: {pokemon[0].attack}</h4>
                                <h4>Defensa: {pokemon[0].defense}</h4>
                                <h4>Velocidad: {pokemon[0].speed}</h4>
                                <h4>Altura: {pokemon[0].height}</h4>
                                <h4>Peso: {pokemon[0].weight}</h4>
                            </div>
                        </div>) : (
                            <div>
                                <h3>CARGANDO ...</h3>
                                <img src='https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif' alt='pokeball img' width='250px' />
                            </div>
                        )
                }
                <Link to='/home'>
                    <button className='buttonHome'>Ir a Home</button>
                </Link>
            </div>
        )
    }
}