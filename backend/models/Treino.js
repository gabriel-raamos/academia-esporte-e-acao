import mongoose, { Schema } from 'mongoose'

const TreinoSchema = new mongoose.Schema({
    treino1: { type: Array },
    treino2: { type: Array },
    treino3: { type: Array },
    treino4: { type: Array },
    treino5: { type: Array },
    visibility: {type: Boolean},
    clienteID : { type: Schema.Types.ObjectId, ref: 'Cliente' }
})

const Treino = mongoose.model('Treino', TreinoSchema)
export default Treino