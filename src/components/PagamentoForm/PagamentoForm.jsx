// import Textbox from "../Textbox/Textbox"

import axios from "axios"
import { useState } from "react"

function Pagamento() {

    const [formData, setFormData] = useState({
        clienteID: '',
        paymentAmount: '',
        paymentMethod: 'pix',
        paymentStatus: 'pending',
        currency: 'BRL',
        transactionID: '',
        payerAccountNumber: '',
        approvalCode: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePlanChange = (e) => {
        const planValue = e.target.value

        switch (planValue) {
            case 'Plano 1':
                setFormData({ ...formData, paymentAmount: 80 })
                break;

            case 'Plano 2':
                setFormData({ ...formData, paymentAmount: 120 })
                break;

            case 'Plano 3':
                setFormData({ ...formData, paymentAmount: 150 })
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/pagamento/registrarpagamento', formData)
            alert('Pagamento salvo: ' + response.data)
        }

        catch (error) {
            alert('Ocorreu um erro ao salvar o pagamento: ' + error)
        }
    }

    return (
        <section>
            <form className="p-5 border-4 border-red-700" >
                <div>
                    <label>Qual dos planos você deseja?</label>

                    <select>
                        <option value="" >Selecione um plano:</option>
                        <option value="Plano 1" >Plano 1 - R$ 80,00</option>
                        <option value="Plano 2" >Plano 2 - R$ 120,00</option>
                        <option value="Plano 3" >Plano 3 - R$ 150,00</option>
                    </select>
                </div>
            </form>
        </section>
    )
}

export default Pagamento