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
            const response = await axios.get('https://pi-academia.vercel.app/api/whatsapp')
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
        <div>
            <h1>Dados da API</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name} e {item.email}</li>
                ))}
            </ul>
        </div>
    )

}