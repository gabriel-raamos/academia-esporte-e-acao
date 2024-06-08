import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000
import clienteRoutes from './routes/clienteRoutes.js'

app.use(cors({
    origin: '*', // Permite todas as origens - use com cautela
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

app.use(bodyParser.json())

import connectDB from './connectMongo.js'

connectDB()

app.use('/api', clienteRoutes)

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})