// import Textbox from "../Textbox/Textbox"

import axios from "axios"
import { useEffect, useState } from "react"
import ModalPagamento from "../ModalPagamento/ModalPagamento"

function Pagamento() {

    const id = JSON.parse(localStorage.getItem('json-data')).id

    const [selectedPlan, setSelectedPlan] = useState('')
    const [clienteCPF, setClienteCPF] = useState('')
    const [clienteCEP, setClienteCEP] = useState('')
    const [clienteNome, setClienteNome] = useState('')
    const [clientePhone, setClientePhone] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        clienteID: id,
        paymentAmount: '',
        paymentMethod: '',
        paymentStatus: 'pending',
        transactionID: '',
        payerAccountNumber: '',
        approvalCode: '',
        clienteNome: '',
        clienteCPF: '',
        clientePhone: ''
    })

    const fetchData = async () => {

        try {
            const response = await axios.get(`https://academia-esporte-e-acao.vercel.app/api/cliente/findbyid/`)
            // alert(response.data.cpf)
            setClienteCPF(response.data.cpf)
            setClienteCEP(response.data.cep)
            setClienteNome(response.data.name)
            setClientePhone(response.data.phone)

        }

        catch (error) {
            alert('ocorreu um erro: ' + error)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePlanChange = (e) => {
        const planValue = e.target.value
        setSelectedPlan(planValue)

        switch (planValue) {
            case '':
                setFormData({ ...formData, paymentAmount: '' })
                break;
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
            const brasiliaDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

            const updatedFormData = {
                ...formData,
                clienteNome: clienteNome,
                clienteCPF: clienteCPF,
                clientePhone: clientePhone,
                transactionID: generateTransactionID(),
                approvalCode: generateApprovalCode(),
                paymentStatus: 'completed',
                createdAt: brasiliaDate,
                updatedAt: brasiliaDate
            };

            await axios.post('https://academia-esporte-e-acao.vercel.app/api/pagamento/registrarpagamento', updatedFormData)

            await axios.put(`https://academia-esporte-e-acao.vercel.app/api/cliente/updateActive/${id}`, { active: true })

            window.location.href = '/'
        }

        catch (error) {
            alert('Ocorreu um erro ao salvar o pagamento: ' + error)
        }
    }

    const generateTransactionID = () => {
        return 'TRANS_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    const generateApprovalCode = () => {
        return 'APPROVAL_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            clienteNome: clienteNome,
            clienteCPF: clienteCPF,
            clientePhone: clientePhone
        }))
    }, [clienteNome, clienteCPF, clientePhone])

    return (
        <section>
            <form
                className="p-3 border-4 border-blue-700 rounded-xl text-xl text-blue-700 mx-2 mb-5 md:mx-0"
                onSubmit={handleSubmit}
            >
                <div className="my-3" >
                    <div className="justify-center flex items-center" >
                        <h1 className="text-3xl font-bold md:my-3 " >Formulário de pagamento</h1>
                    </div>

                    <div className="grid grid-cols-2 justify-center md:gap-5" >
                        <div className="flex justify-center items-center" >
                            <label className="font-bold" >Escolha o plano:</label>
                        </div>

                        <select
                            className="border-4 border-blue-700 p-3 rounded-xl mt-5 md:mt-0 bg-white"
                            name="paymentAmount"
                            value={selectedPlan}
                            onChange={handlePlanChange}
                        >
                            <option value="" >Selecione um plano</option>
                            <option value="Plano 1" >Plano 1 - R$ 80,00</option>
                            <option value="Plano 2" >Plano 2 - R$ 120,00</option>
                            <option value="Plano 3" >Plano 3 - R$ 150,00</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-2 items-center font-bold" >
                    <div className="justify-center flex" >
                        <label>CPF:</label>
                    </div>
                    <input
                        type='text'
                        placeholder="CPF"
                        className="border-4 border-blue-700 p-3 rounded-xl max-w-full"
                        value={clienteCPF}
                        disabled
                    />
                </div>

                <div className="font-bold my-3 grid grid-cols-2" >
                    <h2 className="justify-center flex" >Método de pagamento: </h2>

                    <div className="grid grid-rows-2 md:flex justify-center">
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
                <div className="my-3" >
                    {formData.paymentMethod == 'pix' ? (
                        <section className="justify-center flex" >
                            <div>
                                {/* <p className="justify-center flex" >PIX</p> */}

                                {formData.paymentAmount == 80 ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleModalOpen}
                                            className="p-5 px-10 bg-blue-700 my-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                        >
                                            Gerar QR code
                                        </button>
                                    </div>
                                ) : formData.paymentAmount == 120 ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleModalOpen}
                                            className="p-5 px-10 bg-blue-700 my-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                        >
                                            Gerar QR code
                                        </button>
                                    </div>
                                ) : formData.paymentAmount == 150 ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleModalOpen}
                                            className="p-5 px-10 bg-blue-700 my-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                        >
                                            Gerar QR code
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <p className="bg-blue-700 text-white rounded-full p-5 mt-5 text-xl" >Selecione um plano para prosseguir</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : formData.paymentMethod == 'cartao' ? (
                        <section className="" >

                            {formData.paymentAmount == '' ? (
                                <div className="flex justify-center" >
                                    <p className="bg-blue-700 text-white rounded-full p-5 mt-5 text-xl" >Selecione um plano para prosseguir</p>
                                </div>
                            ) : (
                                <div>
                                    <div className="justify-center grid grid-rows-5">

                                        <div className="flex justify-center">
                                            <input
                                                placeholder="Número do cartão"
                                                type="number"
                                                className="border-4 border-blue-700 p-3 rounded-xl max-w-full my-3 md:w-96"
                                                name="payerAccountNumber"
                                                value={formData.payerAccountNumber}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="flex justify-center" >
                                            <input
                                                placeholder="Código de segurança"
                                                type="number"
                                                className="border-4 border-blue-700 p-3 rounded-xl max-w-full my-3 md:w-96"
                                            />
                                        </div>

                                        <div className="flex justify-center items-center md:grid md:grid-cols-2" >
                                            <label className="font-bold" >Data de validade: </label>
                                            <input
                                                type="date"
                                                placeholder="Data de validade"
                                                className="border-4 border-blue-700 p-3 rounded-xl max-w-full my-3"
                                            />
                                        </div>

                                        <div className="justify-center items-center grid grid-cols-2" >
                                            <label className="font-bold" >CEP: </label>
                                            <input
                                                type="number"
                                                placeholder="CEP"
                                                value={clienteCEP}
                                                className="border-4 border-blue-700 p-3 rounded-xl max-w-full my-3"
                                                disabled
                                            />
                                        </div>

                                        <div className="flex justify-center items-center md:grid md:grid-cols-2" >
                                            <label className="font-bold" >Número da residência: </label>
                                            <input
                                                type="number"
                                                placeholder="Número"
                                                className="border-4 border-blue-700 p-3 rounded-xl max-w-full my-3 w-1/2"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center" >
                                        <button
                                            type="submit"
                                            className="p-5 px-10 bg-blue-700 my-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                        // onClick={handleSubmit}
                                        >
                                            Pagar
                                        </button>
                                    </div>
                                </div>
                            )}

                        </section>
                    ) : (
                        <div className="justify-center flex" >
                            <p>
                                Escolha o método de pagamento para prosseguir.
                            </p>
                        </div>
                    )}
                </div>
            </form>

            {isModalOpen && (
                <ModalPagamento
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    paymentAmount={formData.paymentAmount}
                    handleSubmit={handleSubmit}
                />
            )}

        </section>
    )
}

export default Pagamento