import express from 'express'
import Pagamento from '../models/Pagamento.js'
// import moment from 'moment-timezone'

const router = express.Router()

router.get('/teste', (req, res) => {
    res.json('teste')
})

router.post('/registrarpagamento', async (req, res) => {
    const { clienteID, paymentAmount, paymentMethod, paymentStatus, transactionID, payerAccountNumber, approvalCode } = req.body;

    // var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    // var stillUtc = moment.utc(date).toDate();

    try {
        // const createdAt = stillUtc
        // const updatedAt = stillUtc

        const newPagamento = new Pagamento({
            clienteID,
            paymentAmount,
            paymentMethod,
            paymentStatus,
            transactionID,
            payerAccountNumber,
            approvalCode,
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


router.get('/mostrarpagamentos', async (req, res) => {
    const response = await Pagamento.find({})

    res.json(response)
})

router.get('/mostrarpagamentosreverso', async (req, res) => {
    try {
        // Alteração aqui: ordenando por createdAt de forma descendente
        const response = await Pagamento.find({}).sort({ createdAt: -1 });

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pagamentos.' });
    }
});

export default router