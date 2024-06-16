// import Textbox from "../Textbox/Textbox"

import axios from "axios"
import { useState } from "react"

function Pagamento() {

    const id = JSON.parse(localStorage.getItem('json-data')).id

    const [formData, setFormData] = useState({
        clienteID: id,
        paymentAmount: '',
        paymentMethod: '',
        paymentStatus: 'pending',
        payerAccountNumber: '',
        approvalCode: ''
    })
    const [selectedPlan, setSelectedPlan] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePlanChange = (e) => {
        const planValue = e.target.value
        setSelectedPlan(planValue)

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
            <form 
                className="p-5 border-4 border-red-700 rounded-xl text-xl text-red-700" 
                onSubmit={handleSubmit}
            >
                <div className="my-3" >
                    <div className="justify-center flex items-center" >
                        <h1 className="text-3xl mb-5 font-bold" >Formulário de pagamento</h1>
                    </div>

                    <div className="md:grid md:grid-cols-2 md:gap-5" >
                        <label className="md:my-3 font-bold" >Qual dos planos você deseja?</label>

                        <select 
                            className="border-4 border-red-700 p-3 rounded-xl mt-5 md:mt-0" 
                            name="paymentAmount"
                            value={selectedPlan}
                            onChange={handlePlanChange}
                        >
                            <option value="" >Selecione um plano:</option>
                            <option value="Plano 1" >Plano 1 - R$ 80,00</option>
                            <option value="Plano 2" >Plano 2 - R$ 120,00</option>
                            <option value="Plano 3" >Plano 3 - R$ 150,00</option>
                        </select>
                    </div>
                </div>

                <div className="font-bold my-3 grid grid-cols-2" >
                    <h2>Método de pagamento: </h2>

                    <div className="grid grid-rows-2 md:flex">
                        <label className="mr-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="pix"
                                checked={formData.paymentMethod === 'pix'}
                                onChange={handleChange}
                                className="mr-3"
                            />
                            PIX
                        </label>

                        <label className="mr-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cartao"
                                checked={formData.paymentMethod === 'cartao'}
                                onChange={handleChange}
                                className="mr-3"
                            />
                            Cartão
                        </label>
                    </div>
                </div>
                {formData.paymentMethod}
            </form>
        </section>
    )
}

export default Pagamento