import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes, filterByType, filterCreated, order } from "../actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import '../styles/Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.types);

    const [orden, setOrden] = useState('')

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
        e.preventDefault();
        dispatch(order(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className='wallpaper'>
            <div>
                <nav className='navhome'>
                    <div className='bar'>
                        <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/87044f58-c765-43c5-bc51-8613e3ac7ab1/ddew4m7-c69a2c41-518f-48ca-ba35-8ab1895464e0.png' alt='pokémon' width='200px'/>
                        <Link to='/pokemons'>
                            <button>Crear Pokémon</button>
                        </Link>
                        <SearchBar />
                        <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/87044f58-c765-43c5-bc51-8613e3ac7ab1/ddew4m7-c69a2c41-518f-48ca-ba35-8ab1895464e0.png' alt='pokes'width='200px'/>
                    </div>
                    <div className='navhome_filter'>
                        <div>
                            <span>Ordenar por:  </span>
                            <select onChange={e => handleOrder(e)}>
                                <option value='' disabled selected>Seleccionar...</option>
                                <option value='asc'>A - Z</option>
                                <option value='desc'>Z - A</option>
                                <option value='asc attack'>Mayor fuerza</option>
                                <option value='desc attack'>Menor fuerza</option>
                            </select>
                        </div>
                        <div>
                            <span>Filtrar por:  </span>
                            <select onChange={e => handleFilterTypes(e)}>
                                <option value='all'>Todos</option>
                                {allTypes?.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <span>Mostrar:  </span>
                            <select onChange={e => handleFilterCreated(e)}>
                                <option value='all'>Todos</option>
                                <option value='created'>Creados</option>
                                <option value='api'>Desde la API</option>
                            </select>
                        </div>
                    </div>
                </nav>
                <br />
                <div className='container'>
                    {
                        currentPokemons?.map((p) => {
                            return (
                                <div className='linkcard'>
                                    <Card image={p.image} name={p.name} type={p.type} id={p.id} key={p.id} />
                                </div>
                            )
                        })
                    }
                </div>

                {
                    currentPokemons.length ?
                        (
                            pageNumber === 1 ?
                            null :
                            (<div className='pagination'>
                                {
                                    currentPage === 1 ? <button className='disabled' disabled onClick={() => { prePage() }}>Anterior</button>
                                        : <button className='button' onClick={() => { prePage() }}>Anterior</button>
                                }
                                <span>  Pág.: {currentPage} de {pageNumber}  </span>
                                {
                                    currentPage === pageNumber ? <button className='disabled' disabled onClick={() => { nextPage() }}>Siguiente</button>
                                        : <button className='button' onClick={() => { nextPage() }}>Siguiente</button>
                                }
                            </div>)
                        ) : (
                            <div>
                                <h3>CARGANDO ...</h3>
                                <img src='https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif' alt='pokeball img' width='250px' />
                            </div>
                        )
                }
                <br />
            </div>
        </div>
    )
}