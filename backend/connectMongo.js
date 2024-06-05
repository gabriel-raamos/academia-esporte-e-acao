import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conectado ao Mongo com sucesso')
    }

    catch (error) {
        console.log("Conexão falhou: " + error)
    }
}

export default connectDB