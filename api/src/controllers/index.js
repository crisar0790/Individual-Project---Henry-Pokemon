const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getApi = async () => {
    const pokemons = [];
    for (let id = 1; id < 41; id++) {
        const idReq = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const idRes = await idReq.data;
        let poke = {
            name: idRes.name,
            id: idRes.id,
            life: idRes.stats[0].base_stat,
            attack: idRes.stats[3].base_stat,
            defense: idRes.stats[4].base_stat,
            speed: idRes.stats[5].base_stat,
            height: idRes.height,
            weight: idRes.weight,
            image: idRes.sprites.other.dream_world.front_default,
            type: idRes.types.map(t => t.type.name)
        };
        pokemons.push(poke);
    }
    return pokemons;
}

const getByName = async (name) => {
    try {
        const idReq = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const idRes = await idReq.data;
            let poke = {
                name: idRes.name,
                id: idRes.id,
                life: idRes.stats[0].base_stat,
                attack: idRes.stats[3].base_stat,
                defense: idRes.stats[4].base_stat,
                speed: idRes.stats[5].base_stat,
                height: idRes.height,
                weight: idRes.weight,
                image: idRes.sprites.other.dream_world.front_default,
                type: idRes.types.map(t => t.type.name)
            };
            return poke;
    } catch (error) {
        console.log(error)
    }
}

const getDB = async () => {
    const pokesdb = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name']
        }
    });
    const pokes = [];
    for (let poke of pokesdb) {
        let pokeType = poke.types.map(t => t.name);
        let pokeInfo = {
            name: poke.name,
            id: poke.id,
            life: poke.life,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            height: poke.height,
            weight: poke.weight,
            image: poke.image,
            type: pokeType
        };
        pokes.push(pokeInfo);
    }
    return pokes;
}

const getAllPokemons = async () => {
    const api = await getApi();
    const database = await getDB();
    const infoTotal = api.concat(database);
    return infoTotal;
}

const getAllTypes = async () => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const types = typesApi.data.results.map(t => t.name);
    types.forEach(t => {
        Type.findOrCreate({
            where: { name: t }
        })
    });
    const typesdb = await Type.findAll({ attributes: ['name'] });
    return typesdb;
}

module.exports = { getApi, getDB, getAllPokemons, getAllTypes, getByName };