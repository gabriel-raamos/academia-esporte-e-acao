import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000
// import clienteRoutes from './routes/clienteRoutes.js'
// import treinoRoutes from './routes/treinoRoutes.js'
import indexRoutes from './routes/indexRoutes.js'

app.use(cors({
    origin: '*', // Permite todas as origens - use com cautela
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite todas as origens
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json())

app.use(bodyParser.json())

import connectDB from './connectMongo.js'

connectDB()

app.use('/api', indexRoutes);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})