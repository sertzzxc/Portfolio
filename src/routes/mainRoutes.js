const express = require('express');
const router = express.Router();

const userRoutes = require('./mainRoutes');

router.use("/landing", userRoutes);

module.exports = router;