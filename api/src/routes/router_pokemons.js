const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { getApi, getDB, getAllPokemons, getByName } = require('../controllers')


//Trae el pokemon cuyo id coincida con el ingresado por params:
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!isNaN(id)) {
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
            return res.json(poke);
        } else if (/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(id)) {
            const pokesDb = await getDB();
            const poke = pokesDb.find(p => p.id === id);
            if (poke) return res.json(poke);
            else res.status(404).send('El id ingresado no corresponde a un Pokemon existente.')
        } else if (id.length !== 36 || isNaN(id) || id > 40) {
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
        let pokemonDB = await getDB();
        if (name) {
            const pokemonAPI = await getByName(name);
            let pokemonName = pokemonDB.find(p => p.name.toLowerCase() === name.toLowerCase());
            if (pokemonAPI) return res.json(pokemonAPI);
            if (pokemonName) return res.json(pokemonName);
            else return res.status(404).send('El nombre ingresado no corresponde a un Pokemon existente.')
        } else {
            const pokemonTotal = await getAllPokemons();
            return res.json(pokemonTotal);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { name, life, attack, defense, speed, height, weight, image, type } = req.body;
    try {
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

router.delete('/delete/:id', async (req, res, next) =>{
    const {id} = req.params;
    try {
        const pokemon = await Pokemon.findByPk(id);
        if (pokemon) {
            await pokemon.destroy();
            res.send('Pokémon elimindo con éxito')
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;
