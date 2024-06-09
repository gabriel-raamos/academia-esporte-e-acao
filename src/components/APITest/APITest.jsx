import axios from "axios";
import { useEffect, useState } from "react";

export default function APITest() {
    // Armazenar os dados da API
    const [data, setData] = useState([])

    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(true)

    // Estado para armazenar os erros
    const [error, setError] = useState(null)

    // Função fetch que irá buscar os dados da API
    const fetchData = async () => {
        try {
            const response = await axios.get('https://pi-academia.vercel.app/api/cliente/mostrarclientes')
            setData(response.data)
            setLoading(false)
        }

        catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) return <p>Carregando...</p>
    if (error) return <p>Ocorreu um erro ao buscar os dados: {error.message}</p>

    return (
        <div className="grid grid-cols-1 justify-center items-center my-10" >
            <div className="flex justify-center items-center" >
                <h1 className="my-5 font-bold text-4xl" >Dados da API</h1>
            </div>

            <div className="flex justify-center items-center text-center mx-5">
                <ul className="text-lg">
                    {data.map((item) => (
                        <p key={item.email}>{item.name} e {item.email}</p>
                    ))}
                </ul>
            </div>
        </div>
    )

}