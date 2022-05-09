import React from "react";
import { Link } from "react-router-dom";
import '../styles/Card.css'

export default function Card({ id, image, name, type }) {
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
                        <Link to={'/home/' + id}>
                            <button type='button'>Ver detalles</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 