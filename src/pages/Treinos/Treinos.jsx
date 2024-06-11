import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard() {
    // const id = JSON.parse(localStorage.getItem('json-data')).id

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // const id = JSON.parse(localStorage.getItem('json-data')).id

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/cliente/${JSON.parse(localStorage.getItem('json-data')).id}`)
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
                {/* <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >ID do cliente: {id}</p> */}
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Carregando...</p>
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
                {/* <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >ID do cliente: {data._id}</h2> */}

                {data.workouts && data.workouts.length > 0 ? (
                    <div>
                        <div className="flex justify-center items-center" >
                            <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Informação sobre os treinos: </h2>
                        </div>
                        <ul className="md:grid md:grid-cols-2" >
                            {data.workouts.map((workout, index) => (
                                <li key={index} className="text-lg rounded-xl p-5 my-5 border-4 text-red-700 border-red-700 font-bold md:m-5">
                                    <p>Treino 1: {workout.treino1}</p>
                                    <p>Treino 2: {workout.treino2}</p>
                                    <p>Treino 3: {workout.treino3}</p>
                                    <p>Treino 4: {workout.treino4}</p>
                                    <p>Treino 5: {workout.treino5}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Não há treinos no banco de dados.</p>
                )}
            </div>

        </section>
    )
}