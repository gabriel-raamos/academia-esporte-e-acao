import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000
import clienteRoutes from './routes/clienteRoutes.js'
import treinoRoutes from './routes/treinoRoutes.js'

app.use(cors({
    origin: '*', // Permite todas as origens - use com cautela
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

app.use(bodyParser.json())

import connectDB from './connectMongo.js'

connectDB()

app.use('/cliente', clienteRoutes)
app.use('/treino', treinoRoutes)

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})