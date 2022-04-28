import React from "react";

export default function Card({ image, name, type }) {
    return (
        <div>
            <img src={image} alt='img pokemon' width='200px' height='200px' />
            <h3>{name}</h3>
            <h4>{type + ' '} </h4>
        </div>
    )
} 