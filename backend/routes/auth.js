import jwt from 'jsonwebtoken'
import Cliente from '../models/Cliente.js'

// admin authentication
async function authenticateTokenAdmin(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.send('Sem token')
    }

    const usuario = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(usuario)
    const email = usuario.email

    const user = await Cliente.findOne({ email })
    console.log(user)

    if (!user || user.role !== "admin") {
        return res.status(403).send('Usuário não tem as credenciais necessárias');
    }

    req.user = usuario

    next()
}

// token authentication
function authenticateToken(req, res, next) {
    const token = req.cookies.token

    if (token === null) {
        return res.send('TOKEN NULL')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // return res.sendStatus(403)
            return res.send("Token inválido")
        }

        req.user = user
        console.log(user)

        next()
    })
}

export { authenticateToken, authenticateTokenAdmin }