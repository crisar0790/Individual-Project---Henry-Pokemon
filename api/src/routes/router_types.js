const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Type } = require('../db');
const { getAllTypes } = require('../controllers')



router.get('/', async (req, res) => {
    const allTypes = await getAllTypes();
    res.json(allTypes);
});

module.exports = router;