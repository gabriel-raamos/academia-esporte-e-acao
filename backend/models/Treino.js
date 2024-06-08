import mongoose, { Schema } from 'mongoose'

const TreinoSchema = new mongoose.Schema({
    treino1: { type: Text },
    treino2: { type: Text },
    treino3: { type: Text },
    treino4: { type: Text },
    treino5: { type: Text },
    treino6: { type: Text },
    clienteID: { type: Schema.Types.ObjectId, ref: 'Cliente' }
})

const Treino = mongoose.model('Treino', TreinoSchema)
export default Treino