import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cliente from './models/Cliente.js'
import bcrypt from 'bcryptjs'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

app.use(cors({
    origin: '*', // Permite todas as origens - use com cautela
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

app.use(bodyParser.json())

import connectDB from './connectMongo.js'

connectDB()

// test
app.get('/api/test', async (req, res) => {
    res.send(process.env.MONGO_URL)

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB conectado`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }

})

// test2
app.get('/api/', (req, res) => {
    res.send('test')
})

// registrar
app.post('/api/register', async (req, res) => {

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
            // details: error
        });
    }

})

// login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ email });
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

// Rota para testar a conexão com o MongoDB
app.get('/api/test-mongodb-connection', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('Conexão com o MongoDB estabelecida com sucesso');
    } else {
        res.status(500).send('Erro ao conectar ao MongoDB');
    }
});

app.get('/api/whatsapp', async (req, res) => {
    const response = await Cliente.find({});
    res.send(response)
})

app.post('/api/loginjwt', (req, res) => {

    const cliente = req.body

    const tokenAcesso = jwt.sign(cliente, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: tokenAcesso })

})

app.get('/api/logarcliente', (req, res) => {
    res.send('teste')
})

app.post('/api/logarcliente', async (req, res) => {
    const { email, password } = req.body;

    try {
        const cliente = await Cliente.findOne({ email });

        const name = cliente.name

        if (!cliente) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ email: cliente.email, password: cliente.password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.setHeader('Authorization', accessToken);
        res.setHeader('x-json-header', {email, password})
        console.log('Token gerado e adicionado ao cabeçalho:', accessToken);

        return res.json({ message: 'Login successful: ', accessToken, name });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    // console.log(authHeader)
    // const token = authHeader && authHeader.split(' ')[1]

    // if (authHeader == null) {
    //     return res.sendStatus(401)
    // }

    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user

        // res.send(authHeader)

        next()
    })
}

app.get('/api/protected', authenticateToken, (req, res) => {
    res.send('JWT: ' + req.headers['authorization'])
})

app.get('/api/protected2', (req, res) => {
    res.send('JWT: ' + req.headers['authorization'])
})

app.get('/api/resetheader', (req,res) => {
    res.setHeader('authorization', '')
})

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})