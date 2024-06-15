import express from 'express'
import clienteRoutes from './clienteRoutes.js'
import treinoRoutes from './treinoRoutes.js'
import pagamentoRoutes from './pagamentoRoutes.js'

const router = express.Router();

// Montar as rotas sob /api
router.use('/cliente', clienteRoutes);
router.use('/treino', treinoRoutes);
router.use('/pagamento', pagamentoRoutes)

export default router;
