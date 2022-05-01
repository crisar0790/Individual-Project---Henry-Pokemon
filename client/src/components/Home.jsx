import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes, filterByType, filterCreated, order } from "../actions";
import Card from "./Card";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.types);
    

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPoke = currentPage * pokemonsPerPage;
    const indexOfFirstPoke = indexOfLastPoke - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke);
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

    function handleFilterTypes(e) {
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterCreated(e.target.value));
    }

    function handleOrder(e) {
        dispatch(order(e.target.value));
    }

    return (
        <div>
            <h1>Pokemon</h1>
            <div>
                <div>
                    <SearchBar/>
                </div>
                <Link to='/pokemons'>
                    <button>Crear Pokemon</button>
                </Link>
                <span>Ordenar por:  </span>
                <select onChange={e => handleOrder(e)}>
                    <option value='' disabled selected>Seleccionar...</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                    <option value='asc attack'>Mayor fuerza</option>
                    <option value='desc attack'>Menor fuerza</option>
                </select>
                <span>Filtrar por:  </span>
                <select onChange={e => handleFilterTypes(e)}>
                    <option value='' disabled selected>Seleccionar...</option>
                    <option value='all'>Todos</option>
                    {allTypes?.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                <span>Mostrar:  </span>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='' disabled selected>Seleccionar...</option>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='apip'>Existentes</option>
                </select>
                {
                    currentPokemons?.map((p) => {
                        return (
                            <div>
                                <Link to={'/home/' + p.id}>
                                    <Card image={p.image} name={p.name} type={p.type.length > 1 ? `${p.type[0]}, ${p.type[1]}` : p.type} key={p.id} />
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
                                <span>  Pág.: {currentPage} de {pageNumber}  </span>
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