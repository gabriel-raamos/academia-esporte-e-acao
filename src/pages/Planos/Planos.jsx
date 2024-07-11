import { Link } from "react-router-dom";
import Card1 from "../../components/Card1/Card1";
import Card2 from "../../components/Card2/Card2";
import Card3 from "../../components/Card3/Card3";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Planos() {

    const userData = localStorage.getItem('json-data')
    const id = userData ? JSON.parse(userData).id : null

    const [active, setActive] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchData() {
        try {
            const response = await axios.get('https://academia-esporte-e-acao.vercel.app/api/cliente/findbyid')

            const cliente = response.data

            setActive(cliente.active)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // if (loading) {
    //     return (
    //         <div className="grid grid-rows-1 justify-center items-center text-lg">
    //             <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
    //         </div>
    //     )
    // } else if (error) {
    //     return (
    //         <div className="grid grid-rows-1 justify-center items-center text-lg">
    //             <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao tentar puxar os dados: {error.message}</p>
    //         </div>
    //     )
    // }

    return (
        <div className="md:grid mt-5" >

            {id ? (
                <div>
                    {loading ? (
                        <div>
                            <div className="grid grid-rows-1 justify-center items-center text-lg">
                                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div>
                            <div className="grid grid-rows-1 justify-center items-center text-lg">
                                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao tentar puxar os dados: {error.message}</p>
                            </div>
                        </div>
                    ) : active == false ? (
                        <div className="flex justify-center items-center" >
                            <Link to="../pagamento">
                                <button
                                    className="bg-blue-700 text-white rounded-full font-bold p-5 my-3 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                >
                                    Adquira um plano!
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center" >
                            <button
                                className="bg-blue-700 text-white rounded-full font-bold p-5 my-3 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                disabled
                            >
                                Você já possui um plano
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center" >
                    <button
                        className="bg-blue-700 text-white rounded-full font-bold p-5 my-3 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        disabled
                    >
                        Faça login para adquirir um plano!
                    </button>
                </div>
            )}

            <div className="flex flex-wrap md:grid-cols-2 justify-center" >
                <Card1 />
                <Card2 />
            </div>
            <div className="md:grid-cols-1" >
                <Card3 />
            </div>

        </div>
    )
}