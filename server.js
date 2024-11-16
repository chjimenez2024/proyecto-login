require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const path = require("path");
const morgan=require("morgan");

const app = express();

// esto va dentro de la conexion de mongo en versiones viejas{useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error de conexión:', error));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', authRoutes);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/prueba', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'prueba.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
