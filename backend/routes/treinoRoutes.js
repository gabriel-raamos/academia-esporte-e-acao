import express from 'express'
import Treino from '../models/Treino.js'
import Cliente from '../models/Cliente.js'

const router = express.Router()

router.post('/registrartreino', async (req, res) => {

    const { treino, visibility, clienteID } = req.body

    try {

        const cliente = await Cliente.findById(clienteID)

        if (!cliente) {
            return res.status(400).json({message: 'Cliente não encontrado.'})
        }

        if (!cliente.role) {
            cliente.role = 'user',
            await cliente.save()
        }

        const newTreino = new Treino({ treino, visibility, clienteID })
        await newTreino.save()

        cliente.workouts.push(newTreino._id)
        await cliente.save()

        console.log(cliente)
        res.status(201).json(newTreino)
    }

    catch (error) {
        console.log('Erro ao registrar o treino: ', error)
        res.status(400).json({ message: 'Erro ao registrar treino', error: error.message })
    }

})

router.get('/mostrartreinos', async (req, res) => {

    const response = await Treino.find({})
    res.send(response)

})

router.get('/mostrartreinos/:id', async (req, res) => {

    const _id = req.params.id

    const treino = await Treino.findById({ _id })

    res.json(treino)

})

router.get('/buscarporcliente/:clienteID', async (req, res) => {
    const clienteID = req.params.clienteID

    const treino = await Treino.find({ clienteID })

    res.json(treino)
})

router.put('/atualizartreino/:id', async (req, res) => {
    const _id = req.params.id

    const { treino, visibility } = req.body

    try {
        const updatedTreino = await Treino.findByIdAndUpdate({ _id }, { treino, visibility }, { new: true })

        if (!updatedTreino) {
            return res.status(404).json({ message: 'Treino não encontrado.' })
        }

        res.json(updatedTreino)
    } 

    catch (error) {
        res.status(500).json({message: 'Erro interno no servidor.'})
    }

})

router.delete('/deletartreino/:id', async (req,res) => {
    const _id = req.params.id

    try {
        await Treino.deleteOne({_id})
        res.json({message: 'treino deletado'})
    }

    catch (error) {
        res.json({message: 'ocorreu um erro ', error})
    }
})

export default router