const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Austin_Animal')

const objetodb = mongoose.connection;
objetodb.on('connected', () => {console.log('conexion correcta a MongoDB')});

objetodb.on('error', () => {console.log('error de conexion  a MongoDB')});

module.exports = mongoose;