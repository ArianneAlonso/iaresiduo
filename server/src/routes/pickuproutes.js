const { Router } = require('express');
const { createPickup, getPickups } = require('../controllers/pickupcontroller');

const router = Router();

router.post('/pickup', createPickup);
router.get('/pickups', getPickups);

module.exports = router;