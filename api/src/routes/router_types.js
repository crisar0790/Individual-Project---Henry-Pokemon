const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Type } = require('../db');

router.get('/', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const types = typesApi.data.results.map(t => t.name);
    types.forEach(t => {
        Type.findOrCreate({
            where: {name: t}
        })
    });
    const allTypes = await Type.findAll();
    res.json(allTypes);
});

module.exports = router;