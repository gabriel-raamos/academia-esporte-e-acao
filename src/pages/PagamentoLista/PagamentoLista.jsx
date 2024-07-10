import axios from "axios"
import moment from "moment-timezone"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function PagamentoLista() {
    // const id = JSON.parse(localStorage.getItem('json-data')).id

    const [role, setRole] = useState('')
    const [pagamentos, setPagamentos] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchRole = async () => {
        try {
            // alert(id)
            const response = await axios.get(`https://academia-esporte-e-acao.vercel.app/api/cliente/findbyid/`)
            setRole(response.data.role)
            // setLoading(false)
        }

        catch (error) {
            alert('Ocorreu um erro ao puxar o cargo do usuário: ' + error)
            setLoading(false)
        }
    }

    const fetchPagamentos = async () => {
        try {
            const response = await axios.get(`https://academia-esporte-e-acao.vercel.app/api/pagamento/mostrarpagamentosreverso`, { withCredentials: true });
            const pagamentosData = response.data;

            if (Array.isArray(pagamentosData)) {
                const pagamentosConvertidos = await Promise.all(
                    pagamentosData.map(async (pagamento) => {
                        // console.log('clienteID:', pagamento.clienteID);

                        try {
                            const clienteResponse = await axios.get(`https://academia-esporte-e-acao.vercel.app/api/cliente/findbycpf/${pagamento.clienteCPF}`);
                            const cliente = clienteResponse.data;

                            if (!cliente) {
                                return {
                                    ...pagamento,
                                    paymentAmount: parseFloat(pagamento.paymentAmount.$numberDecimal),
                                    clienteName: pagamento.clienteNome,
                                    clientePhone: pagamento.clientePhone,
                                    clienteCPF: pagamento.clienteCPF,
                                    statusDeletado: 'Cliente deletado'
                                };
                            }

                            return {
                                ...pagamento,
                                paymentAmount: parseFloat(pagamento.paymentAmount.$numberDecimal),
                                clienteName: pagamento.clienteNome,
                                clientePhone: pagamento.clientePhone,
                                clienteCPF: pagamento.clienteCPF,
                                statusDeletado: ''
                            };
                        } catch (error) {
                            // console.error(`Erro ao buscar dados do cliente para ID ${pagamento.clienteID}:`, error);
                            return {
                                ...pagamento,
                                paymentAmount: parseFloat(pagamento.paymentAmount.$numberDecimal),
                                clienteName: 'Erro ao buscar cliente',
                                clientePhone: '',
                                clienteCPF: '',
                                statusDeletado: ''
                            };
                        }
                    })
                );

                setPagamentos(pagamentosConvertidos);
                setLoading(false);
            } else {
                throw new Error("Resposta da API de pagamentos não é um array");
            }
        } catch (error) {
            setError(error);
            setLoading(false);
            alert('Ocorreu um erro ao puxar os pagamentos: ' + error.message);
        }
    };


    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchRole()
            await fetchPagamentos()
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-rows-1 justify-center items-center text-lg">
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 m-5 text-xl">Carregando...</p>
            </div>
        )
    } else if (error) {
        return (
            <div className="grid grid-rows-1 justify-center items-center text-lg">
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 m-5 text-xl">Ocorreu um erro ao tentar puxar os dados: {error.message}</p>
            </div>
        )
    }

    return (
        <section>
            {role == 'admin' ? (
                <section className="" >
                    <div className="flex justify-center items-center mt-5">
                        <div>
                            <div className="flex justify-center items-center" >
                                <input
                                    type="text"
                                    placeholder="Buscar por nome do cliente"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mb-4 border-4 border-blue-700 rounded-xl p-2 text-lg w-72"
                                />
                            </div>
                            <div className="md:grid md:grid-cols-2 gap-4 mx-5">
                                {pagamentos
                                    .filter(pagamento =>
                                        pagamento.clienteName.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((pagamento) => (
                                        <div key={pagamento._id} className="mb-4 p-2 grid grid-cols-2 justify-center items-center text-white bg-blue-700 font-bold rounded-xl">
                                            <p className="text-lg mx-2 text-center">
                                                Cliente: {pagamento.clienteName}
                                            </p>
                                            <p className="text-lg mx-2 text-center">
                                                Telefone: {pagamento.clientePhone}
                                            </p>
                                            <p className="text-lg mx-2 text-center">
                                                Valor: R$ {pagamento.paymentAmount.toFixed(2)}
                                            </p>
                                            <p className="text-lg mx-2 text-center">
                                                Método: {pagamento.paymentMethod}
                                            </p>
                                            <p className="text-lg mx-2 text-center">
                                                Data/Hora: {moment.tz(pagamento.createdAt, 'America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')}
                                            </p>
                                            <p className="text-lg mx-2 text-center mb-2">
                                                CPF: {pagamento.clienteCPF}
                                            </p>
                                            <p className="text-lg mx-2 text-center mb-2">
                                                ID: {pagamento._id}
                                            </p>
                                            <p className="text-lg mx-2 text-center mb-2 text-red-700 -translate-y-5 md:-translate-y-0">
                                                {pagamento.statusDeletado}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="justify-center items-center" >
                    <div className="flex justify-center items-center" >
                        <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Essa página só deve ser acessada por pessoas com permissão</p>
                    </div>

                    <div className="flex justify-center items-center" >
                        <Link to='../' >
                            <button className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500" >
                                Clique aqui para voltar para a home page.
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    )
}