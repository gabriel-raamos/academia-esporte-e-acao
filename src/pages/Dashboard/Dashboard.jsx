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
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5" >ID do cliente: {id}</p>
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5" >Carregando...</p>
            </div>
        )
    } else if (error) {
        return (
            <p>Ocorreu um erro ao usar os dados: {error.message}</p>
        )
    }

    // const jsonWorkouts = JSON.stringify(data.workouts, null, 2)
    // const treino1 = data.workouts[0].treino1

    return (
        <section className="flex justify-center items-center" >

            <div>
                <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >ID do cliente: {data._id}</h2>
                <h2 className="text-lg" >IDs dos treinos: </h2>
                <ul>
                    {data.workouts.map((workout, index) => (
                        <li key={index} className="text-lg">
                            - {workout._id}
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    )
}