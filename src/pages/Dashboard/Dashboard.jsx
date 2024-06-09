import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard() {
    // const id = JSON.parse(localStorage.getItem('json-data')).id

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const id = JSON.parse(localStorage.getItem('json-data')).id

    const teste = async () => {
        try {
            const response = await axios.get(`https://pi-academia.vercel.app/cliente/${id}`)
            setData(response.data)
            setLoading(false)
        }

        catch (error) {
            setError(error)
            setLoading(error)
        }
    }

    useEffect(() => {
        teste()
    }, [])

    if (loading) return (
        <div>
            <p>id: {id}</p>
            <p>Carregando...</p>
        </div>
    )

    if (error) return <p>Ocorreu um erro ao usar os dados: {error.message}</p>

    return (
        <section className="flex justify-center items-center" >

            <div>
                <pre className="text-lg">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>

        </section>
    )
}