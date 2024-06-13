import mongoose, { Schema } from 'mongoose'

const TreinoSchema = new mongoose.Schema({
    treino1: { type: String },
    treino2: { type: String },
    treino3: { type: String },
    treino4: { type: String },
    treino5: { type: String },
    visibility: {type: Boolean},
    clienteID : { type: Schema.Types.ObjectId, ref: 'Cliente' }
})

const Treino = mongoose.model('Treino', TreinoSchema)
export default Treino