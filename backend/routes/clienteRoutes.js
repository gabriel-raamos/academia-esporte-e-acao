import express from 'express'
import mongoose from 'mongoose' 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Cliente from '../models/Cliente.js'

const router = express.Router()

// test
router.get('/test', async (req, res) => {
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
router.get('/', (req, res) => {
    res.send('test')
})

// registrar
router.post('/register', async (req, res) => {

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
router.post('/login', async (req, res) => {
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
router.get('/test-mongodb-connection', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('Conexão com o MongoDB estabelecida com sucesso');
    } else {
        res.status(500).send('Erro ao conectar ao MongoDB');
    }
});

router.get('/whatsapp', async (req, res) => {
    const response = await Cliente.find({});
    res.send(response)
})

router.post('/loginjwt', (req, res) => {

    const cliente = req.body

    const tokenAcesso = jwt.sign(cliente, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: tokenAcesso })

})

router.get('/logarcliente', (req, res) => {
    res.send('teste')
})

router.post('/logarcliente', async (req, res) => {
    const { email, password } = req.body;

    try {
        const cliente = await Cliente.findOne({ email });

        // const name = cliente.name

        // console.log(cliente)

        if (!cliente) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ email: cliente.email, password: cliente.password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        console.log('Token gerado e adicionado ao cabeçalho: ', accessToken);

        return res.json({ message: 'Login successful', accessToken, cliente });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization']

    const token = localStorage.getItem('authorization')

    // console.log(authHeader)
    // const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user

        // res.send(authHeader)

        next()
    })
}

router.get('/protected', authenticateToken, (req, res) => {
    res.send('JWT: ' + req.headers['authorization'])
})

router.get('/protected2', (req, res) => {
    res.send('JWT: ' + req.headers['authorization'])
})

router.get('/resetheader', (req,res) => {
    res.setHeader('authorization', '')
})

export default router