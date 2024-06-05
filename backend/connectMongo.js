import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conectado ao Mongo com sucesso')
    }

    catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        if (error instanceof mongoose.Error) {
            console.error('Mongoose-specific error:', error.message);
        } else {
            console.error('General error:', error.message);
        }
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}

export default connectDB