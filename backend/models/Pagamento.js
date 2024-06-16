import mongoose, { Schema } from "mongoose";

const PagamentoSchema = new mongoose.Schema({
    clienteID : { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    paymentAmount: { type: Schema.Types.Decimal128, required: true },
    paymentMethod: { type: String, enum: ['pix', 'cartao'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending', required: true },
    currency: { type: String, default: 'BRL', required: true },
    transactionID: { type: String, unique: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    payerAccountNumber: { type: String },
    approvalCode: { type: String }
})

PagamentoSchema.pre('save', (next) => {
    this.updatedAt = Date.now()

    if (!this.transactionID) {
        this.transactionID = new mongoose.Types.ObjectId().toString()
    }

    next()

})

const Pagamento = mongoose.model('Pagamento', PagamentoSchema)
export default Pagamento