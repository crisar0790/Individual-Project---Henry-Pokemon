export function filterPokemons(allPokemons, filteredByCreated, filteredByType) {
    let pokemonsFilteredCreated;

    if (filteredByCreated === 'all') {
        pokemonsFilteredCreated = allPokemons;
    } else {
        pokemonsFilteredCreated = filteredByCreated === 'created'
            ? allPokemons.filter(p => isNaN(p.id))
            : allPokemons.filter(p => !isNaN(p.id))
    }

    let pokemonsFilteredType;

    if (filteredByType === 'all') {
        pokemonsFilteredType = pokemonsFilteredCreated;
    } else {
        pokemonsFilteredType = pokemonsFilteredCreated.filter(p => p.type.find(t => t === filteredByType))
    }

    return pokemonsFilteredType;
}

export function orderPokemons(pokemonsFiltered, pokemonsByOrder) {
    let pokemons = [...pokemonsFiltered];
    let pokemonsOrdered = [];

    if (pokemonsByOrder === '') {
        pokemonsOrdered = pokemons;
    } else {
        pokemonsOrdered =
            pokemonsByOrder === 'asc'
                ? pokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                : pokemonsByOrder === 'desc'
                    ? pokemons.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    })
                    : pokemonsByOrder === 'desc attack'
                        ? pokemons.sort((a, b) => {
                            if (a.attack > b.attack) {
                                return 1;
                            }
                            if (b.attack > a.attack) {
                                return -1;
                            }
                            return 0;
                        }) : pokemons.sort((a, b) => {
                            if (a.attack > b.attack) {
                                return -1;
                            }
                            if (b.attack > a.attack) {
                                return 1;
                            }
                            return 0;
                        })
    }

    return pokemonsOrdered;
}