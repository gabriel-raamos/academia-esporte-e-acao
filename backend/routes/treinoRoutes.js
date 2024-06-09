import express from 'express'
import Treino from '../models/Treino.js'
import Cliente from '../models/Cliente.js'

const router = express.Router()

router.post('/registrartreino', async (req,res) => {

    const { treino1, treino2, treino3, treino4, treino5, clienteID } = req.body

    try {
        const newTreino = new Treino({ treino1, treino2, treino3, treino4, treino5, clienteID })

        await newTreino.save()

        const cliente = await Cliente.findById(clienteID)
        cliente.workouts.push(newTreino._id)
        await cliente.save()

        console.log(cliente)

        res.status(201).send('Treino registrado com sucesso.')
    }

    catch (error) {
        console.log('Erro ao registrar o treino: ', error)
        res.status(400).json({message: 'Erro ao registrar treino', error: error.message})
    }

})

router.get('/mostrartreinos', async (req,res) => {

    const response = await Treino.find({})
    res.send(response)

})

export default router