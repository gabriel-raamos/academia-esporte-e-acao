import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cliente from './models/Cliente.js'
import bcrypt from 'bcryptjs'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.VITE_MONGO_URL,)
    .then(() => {
        console.log('Conectado ao MongoDB')
    }).catch(err => {
        console.error('Erro ao conectar ao MongoDB', err)
    })

// test
app.get('/api/test', (req, res) => {
    res.send(process.env.VITE_MONGO_URL)
    res.send(import.meta.env.VITE_MONGO_URL)
})

// test2
app.get('/api/', (req, res) => {
    res.send('test')
})

// registrar
app.post('/api/register', async (req, res) => {

    res.send('test')

    const { name, email, password, date, phone, cpf, cep, height, weight } = req.body

    try {
        const newCliente = new Cliente({ name, email, password, date, phone, cpf, cep, height, weight })

        await newCliente.save()
        res.status(201).send('Usuário registrado')
    }

    catch (error) {
        console.error('Error registering user', error);
        res.status(400).json({
            message: 'Error registering user',
            error: error.message,
            details: error
        });
    }

})

// login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ username });
        if (!cliente) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
            details: error
        });
    }

})

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})

console.log(process.env.VITE_MONGO_URL)

//   { "src": "", "use": "@vercel/static-build" },

//   { "src": "/(.*)", "dest": "/frontend/$1" }