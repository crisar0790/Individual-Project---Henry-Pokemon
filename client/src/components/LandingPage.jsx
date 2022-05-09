import React from "react";
import { Link } from "react-router-dom";
import '../styles/LandingPage.css'

export default function LandingPage() {
    return (
        <div className='background'>
            <div className='container'>
                <h1 className='h1'>¿Estás listo para vivir tu aventura Pokémon?</h1>
                <Link to='/home'>
                    <button className='Btn'>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}