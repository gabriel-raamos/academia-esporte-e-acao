import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const ClienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: String, required: true },
    phone: { type: String, required: true, },
    cpf: { type: String, required: true },
    cep: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    active: { type: Boolean, required: true },
    role: { type: String, required: true },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref:'Treino' }]
})

ClienteSchema.pre('save', async function (next) {
    try {
        // Verificar se a senha foi modificada
        if (!this.isModified('password')) {
            return next();
        }
        // Gerar o salt
        const salt = await bcrypt.genSalt(10);
        // Hash da senha
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

const Cliente = mongoose.model('Cliente', ClienteSchema)
export default Cliente
