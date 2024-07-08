import express from 'express'
import Pagamento from '../models/Pagamento.js'
import { authenticateToken, authenticateTokenAdmin } from './auth.js'

import cookieParser from 'cookie-parser'

const router = express.Router()
router.use(cookieParser())

router.get('/teste', (req, res) => {
    res.json('teste')
})

router.post('/registrarpagamento', authenticateToken, async (req, res) => {
    const { paymentAmount, paymentMethod, paymentStatus, transactionID, payerAccountNumber, approvalCode, clienteNome, clienteCPF } = req.body;

    // var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    // var stillUtc = moment.utc(date).toDate();

    try {
        // const createdAt = stillUtc
        // const updatedAt = stillUtc

        const newPagamento = new Pagamento({
            paymentAmount,
            paymentMethod,
            paymentStatus,
            transactionID,
            payerAccountNumber,
            approvalCode,
            clienteNome,
            clienteCPF
            // createdAt,
            // updatedAt
        });

        const savedPagamento = await newPagamento.save();
        res.json(savedPagamento);
        console.log(savedPagamento);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao salvar o pagamento' });
    }
});


router.get('/mostrarpagamentos', authenticateTokenAdmin, async (req, res) => {
    const response = await Pagamento.find({})

    res.json(response)
})

router.get('/mostrarpagamentosreverso', authenticateTokenAdmin, async (req, res) => {
    try {
        // ordenando por createdAt de forma descendente
        const response = await Pagamento.find({}).sort({ createdAt: -1 });

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pagamentos.' });
    }
});

export default router