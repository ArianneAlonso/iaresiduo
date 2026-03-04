const { Router } = require('express');
const { getContainers } = require('../controllers/containercontroller');

const router = Router();

router.get('/containers', getContainers);

module.exports = router;