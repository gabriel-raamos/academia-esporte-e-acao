import express from 'express'
// import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Cliente from '../models/Cliente.js'

import { authenticateToken, authenticateTokenAdmin } from './auth.js'

import cookieParser from 'cookie-parser'

const router = express.Router()
router.use(cookieParser())

// admin authentication
// async function authenticateTokenAdmin(req, res, next) {
//     const token = req.cookies.token

//     if (!token) {
//         return res.send('Sem token')
//     }

//     const usuario = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     console.log(usuario)
//     const email = usuario.email

//     const user = await Cliente.findOne({ email })
//     console.log(user)

//     if (!user || user.role !== "admin") {
//         return res.status(403).send('Usuário não tem as credenciais necessárias');
//     }

//     req.user = usuario

//     next()
// }

// token authentication
// function authenticateToken(req, res, next) {
//     const token = req.cookies.token

//     if (token === null) {
//         return res.send('TOKEN NULL')
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             // return res.sendStatus(403)
//             return res.send("Token inválido")
//         }

//         req.user = user
//         console.log(user)

//         next()
//     })
// }

// registrar
router.post('/register', async (req, res) => {

    const { name, email, password, date, phone, cpf, cep, height, weight, role, active } = req.body

    if (!role) {
        return res.status(400).json({ message: 'O campo role é obrigatório' });
    }

    try {
        const newCliente = new Cliente({ name, email, password, date, phone, cpf, cep, height, weight, role, active })

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

// router.get('/mostrarclientes', async (req, res) => {
//     const response = await Cliente.find({});
//     res.send(response)
// })

router.post('/logarcliente', async (req, res) => {
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

        const accessToken = jwt.sign({ id: cliente._id, email: cliente.email }, process.env.ACCESS_TOKEN_SECRET);

        res.cookie('token', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });

        const clienteData = { id: cliente._id };

        return res.json({ message: 'Login efetuado com sucesso.', clienteData });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    return res.json({ message: 'Logout efetuado com sucesso.' });
});

router.get('/clienteemail/:email', authenticateToken, async (req, res) => {
    const email = req.params.email

    const cliente = await Cliente.findOne({ email }).populate('workouts')

    if (!cliente) {
        return res.status(404).send({ message: 'Cliente não encontrado.' });
    }

    res.send(cliente);
})

router.get('/findbyid/', authenticateToken, async (req, res) => {

    const _id = req.user.id

    const cliente = await Cliente.findOne({ _id })

    res.json(cliente)

})

router.get('/findbyid/:id', authenticateToken, async (req, res) => {

    const _id = req.params.id

    const cliente = await Cliente.findOne({ _id })

    res.json(cliente)

})

// added admin token verification
router.get('/findworkoutsbyid', authenticateToken, async (req, res) => {

    const _id = req.user.id

    const cliente = await Cliente.findById({ _id }).populate('workouts')

    if (!cliente) {
        return res.status(404).send({ message: 'Cliente não encontrado.' });
    }

    res.send(cliente);

})

router.put('/atualizarcliente', authenticateTokenAdmin, async (req, res) => {
    const { _id, name, email, phone, cpf, cep, height, weight, active, role } = req.body

    try {
        const cliente = await Cliente.findOneAndUpdate({ _id }, { name, email, phone, cpf, cep, height, weight, active, role }, { new: true })

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado.' })
        }

        res.json(cliente)
    }

    catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor: ', error })
    }

})

router.get('/clientealfabetico', authenticateTokenAdmin, async (req, res) => {

    try {
        const clientes = await Cliente.find({}).collation({ locale: 'pt', strength: 1 }).sort({ name: 1 });
        res.json({ clientes });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }

})

function calculateExpirationDate() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // 30 dias no futuro
    return expirationDate;
}

router.put('/updateActive/:id', authenticateToken, async (req, res) => {
    const _id = req.params.id;
    const active = req.body.active;

    // console.log('ID do usuário: ' + _id)

    try {
        const expirationDate = calculateExpirationDate();
        const updateFields = { active, expirationDate };

        const cliente = await Cliente.findByIdAndUpdate({ _id }, { $set: updateFields }, { new: true });

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
})

// .
// TESTING JWT
// .

router.get('/protected', authenticateToken, (req, res) => {
    res.send('o teste funcionou')
})

router.get('/protected2', authenticateTokenAdmin, (req, res) => {
    res.send('o teste funcionou')
})

router.get('/mostrarclientestoken', authenticateToken, async (req, res) => {
    try {
        const response = await Cliente.find({});
        res.send(response)
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
})

router.get('/mostrarclientestokenadmin', authenticateTokenAdmin, async (req, res) => {
    try {
        const response = await Cliente.find({});
        res.send(response)
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
})

router.get('/clientealfabeticotoken', authenticateTokenAdmin, async (req, res) => {

    try {
        const clientes = await Cliente.find({}).collation({ locale: 'pt', strength: 1 }).sort({ name: 1 });
        res.json({ clientes });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }

})

router.put('/atualizarclientetoken', authenticateTokenAdmin, async (req, res) => {
    const { _id, name, email, phone, cpf, cep, height, weight, active, role } = req.body

    try {
        const cliente = await Cliente.findOneAndUpdate({ _id }, { name, email, phone, cpf, cep, height, weight, active, role }, { new: true })

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado.' })
        }

        res.json(cliente)
    }

    catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor: ', error })
    }

})

router.delete('/deletarcliente/:id', authenticateTokenAdmin, async (req, res) => {
    const _id = req.params.id

    try {
        await Cliente.deleteOne({ _id })

        res.json({ message: 'Cliente excluído com sucesso.' })

    } catch (error) {
        res.json({ message: 'Erro interno no servidor: ', error })
    }

})

router.put('/updateActiveToken/:id', authenticateToken, async (req, res) => {
    const _id = req.params.id;
    const active = req.body.active;

    console.log('ID do usuário: ' + _id)

    try {
        const cliente = await Cliente.findByIdAndUpdate({ _id }, { active }, { new: true });

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
})

router.get('/findbycpf/:cpf', authenticateTokenAdmin, async (req, res) => {
    const cpf = req.params.cpf

    try {
        const cliente = await Cliente.findOne({ cpf })

        res.json(cliente)

    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor: ', error })

    }
})

// ------------------------------------------------



// router.get('/set-cookie', (req, res) => {
//     res.cookie('token', 'whatsapp', { httpOnly: true, secure: false });
//     res.send('Cookie has been set');
// });

// // Rota para ler o cookie
// router.get('/read-cookie', (req, res) => {
//     const token = req.cookies.token;
//     console.log('Token:', token);
//     res.send('Token value: ' + token);
// });

export default router
