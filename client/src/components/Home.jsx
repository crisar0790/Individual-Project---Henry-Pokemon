import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes } from "../actions";
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.types);

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPoke = currentPage * pokemonsPerPage;
    const indexOfFirstPost = indexOfLastPoke - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPost, indexOfLastPoke);
    const pageNumber = Math.ceil(allPokemons.length / pokemonsPerPage);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prePage = () => {
        setCurrentPage(currentPage - 1);
    }


    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            <h1>Pokemon</h1>
            <div>
                <Link to='/pokemons'>
                    <button>Crear Pokemon</button>
                </Link>
                <select>
                    <option value='' disabled selected>Ordenar por...</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                    <option value='asc attack'>Mayor fuerza</option>
                    <option value='desc attack'>Menor fuerza</option>
                </select>
                <select>
                    <option value='' disabled selected>Filtrar por tipo...</option>
                    {allTypes?.map(t => <option value={t.name}>{t.name}</option>)}
                </select>
                <select>
                    <option value='' disabled selected>Mostrar...</option>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='apip'>Existentes</option>
                </select>
                {
                    currentPokemons?.map((p) => {
                        return (
                            <div>
                                <Link to={'/home/' + p.id}>
                                    <Card image={p.image} name={p.name} type={p.type} key={p.id} />
                                </Link>
                            </div>
                        )
                    })
                }
                {
                    currentPokemons.length ?
                        (
                            <div>
                                {
                                    currentPage === 1 ? <button disabled onClick={() => { prePage() }}>Anterior</button>
                                        : <button onClick={() => { prePage() }}>Anterior</button>
                                }
                                <span>  Se encuentra en la pág.: {currentPage}  </span>
                                {
                                    currentPage === pageNumber ? <button disabled onClick={() => { nextPage() }}>Siguiente</button>
                                        : <button onClick={() => { nextPage() }}>Siguiente</button>
                                }
                            </div>
                        ) : (
                            <div>
                                <h3>CARGANDO ...</h3>
                                <img src='https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif' alt='pokeball img' width='350px' />
                            </div>
                        )
                }

            </div>
        </div>
    )
}