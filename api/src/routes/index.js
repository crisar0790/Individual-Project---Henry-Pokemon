const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router_pokemons = require('./router_pokemons');
const router_types = require('./router_types');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', router_pokemons);
router.use('/types', router_types);

module.exports = router;
