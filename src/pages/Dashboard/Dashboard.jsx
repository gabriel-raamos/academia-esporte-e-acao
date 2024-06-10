import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard() {
    // const id = JSON.parse(localStorage.getItem('json-data')).id

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const id = JSON.parse(localStorage.getItem('json-data')).id

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/cliente/${id}`)
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

    if (loading) {
        return (
            <div className="grid grid-rows-2 justify-center items-center text-lg" >
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5" >id: {id}</p>
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5" >Carregando...</p>
            </div>
        )
    } else if (error) {
        return (
            <p>Ocorreu um erro ao usar os dados: {error.message}</p>
        )
    }

    return (
        <section className="flex justify-center items-center" >

            <div>
                <pre className="text-lg">
                    {JSON.stringify(data.workouts, null, 2)}
                </pre>
            </div>

        </section>
    )
}