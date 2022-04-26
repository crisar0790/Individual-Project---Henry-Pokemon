const express = require('express');
const router = express.Router();
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

//Trae el pokemon cuyo id coincida con el ingresado por params:
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(id) && !isNaN(id) && id < 899) {
            const idReq = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const idRes = await idReq.data;
            const poke = {
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
            if (poke) return res.json(poke);
            else res.status(404).send('El id ingresado no corresponde a un Pokemon existente.')
        } else if (/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(id)) {
            const pokedb = await Pokemon.findByPk(id, { include: Type });
            const pokeType = pokedb.types.map(t => t.name);
            const pokeInfo = {
                name: pokedb.name,
                id: pokedb.id,
                life: pokedb.life,
                attack: pokedb.attack,
                defense: pokedb.defense,
                speed: pokedb.speed,
                height: pokedb.height,
                weight: pokedb.weight,
                image: pokedb.image,
                type: pokeType
            }
            if (pokeInfo) return res.json(pokeInfo);
            else res.status(404).send('El id ingresado no corresponde a un Pokemon existente.')
        } else if (id.length !== 36 || isNaN(id) || id > 898) {
            return res.status(404).send('El id ingresado no corresponde a un Pokemon existente.')
        }
    } catch (error) {
        next(error);
    }
});

//Trae a los 40 pokemones pero si se le envía un nombre por query trae el de ese:
router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        let pokemonTotal = await getAllPokemons();
        if (name) {
            let pokemonName = pokemonTotal.find(p => p.name.toLowerCase() === name.toLowerCase())
            if (pokemonName) return res.json(pokemonName);
            else return res.status(404).send('El nombre ingresado no corresponde a un Pokemon existente.')
        } else {
            return res.json(pokemonTotal);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { name, life, attack, defense, speed, height, weight, image, type } = req.body;
    try {
        if (!name) return res.status(400).send('El nombre es un campo obligatorio.');
        let pokemonTotal = await getAllPokemons();
        let pokemonName = pokemonTotal.find(p => p.name.toLowerCase() === name.toLowerCase())
        if (pokemonName) return res.status(400).send('Ya existe un pokemon con ese nombre.')
        if (isNaN(life) || isNaN(attack) || isNaN(defense) || isNaN(speed) || isNaN(height) || isNaN(weight)) {
            return res.status(400).send('Estos campos deben recibir números enteros.')
        }
        const pokemon = await Pokemon.create({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            image
        });
        let pokeType = await Type.findAll({
            where: { name: type }
        });
        await pokemon.addType(pokeType)
        res.status(201).send("Pokemon creado");
    } catch (error) {
        next(error);
    }
})


module.exports = router;
