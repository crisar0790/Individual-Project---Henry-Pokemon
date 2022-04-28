import React from "react";

export default function Pagination({ pokemonsPerPage, allPokemons, pagination }) {
    const pageNumbers = [];
    for (let i = 0; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number => (
                    <li>
                        <a onClick={() => pagination(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}