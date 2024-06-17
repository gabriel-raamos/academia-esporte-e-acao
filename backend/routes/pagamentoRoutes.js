import express from 'express'
import Pagamento from '../models/Pagamento.js'

const router = express.Router()

router.get('/teste', (req,res) => {
    res.json('teste')
})

router.post('/registrarpagamento', async (req,res) => {
    const { clienteID, paymentAmount, paymentMethod, paymentStatus, transactionID, payerAccountNumber, approvalCode } = req.body

    try {
        const newPagamento = new Pagamento({
            clienteID,
            paymentAmount,
            paymentMethod,
            paymentStatus,
            transactionID,
            payerAccountNumber,
            approvalCode
        })

        const savedPagamento = await newPagamento.save()
        res.json(savedPagamento)
        console.log(savedPagamento)
    }

    catch (error) {
        console.log(error)
        res.json({error})
    }

})

export default router