import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pi-academia.vercel.app/cliente/${JSON.parse(localStorage.getItem('json-data')).email}`)
            const fetchedData = response.data;

            // Substituir ';' por '\n' nos workouts
            if (fetchedData.workouts) {
                fetchedData.workouts = fetchedData.workouts.map(workout => {
                    const processedWorkout = {};
                    for (let key in workout) {
                        if (typeof workout[key] === 'string') {
                            processedWorkout[key] = workout[key].replace(/;/g, '\n');
                        } else {
                            processedWorkout[key] = workout[key];
                        }
                    }
                    return processedWorkout;
                });
            }

            setData(fetchedData);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (loading) {
        return (
            <div className="grid grid-rows-2 justify-center items-center text-lg">
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
            </div>
        )
    } else if (error) {
        return (
            <p>Ocorreu um erro ao usar os dados: {error.message}</p>
        )
    }

    return (
        <section className="flex justify-center items-center">
            <div>

                {data.role ? (
                    <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Role do usuário: {data.role}</h2>
                ) : (
                    <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Não há role definida.</p>
                )}

                {data.workouts && data.workouts.length > 0 ? (
                    <div className="" >
                        <div className="flex justify-center items-center">

                            <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Informação sobre os treinos:</h2>

                        </div>
                        <ul className="md:grid md:grid-cols-2 gap-4">
                            {data.workouts.map((workout, index) => (
                                <li key={index} className="text-lg rounded-xl p-5 my-5 border-4 text-red-700 border-red-700 font-bold md:m-5 whitespace-pre-line overflow-y-auto">
                                    <div className="flex" >
                                        <p className="mr-2" >Treino 1:</p>
                                        <p> {workout.treino1}</p>
                                    </div>
                                    <div className="flex" >
                                        <p className="mr-2" >Treino 2:</p>
                                        <p> {workout.treino2}</p>
                                    </div>
                                    <div className="flex" >
                                        <p className="mr-2" >Treino 3:</p>
                                        <p> {workout.treino3}</p>
                                    </div>
                                    <div className="flex" >
                                        <p className="mr-2" >Treino 4:</p>
                                        <p> {workout.treino4}</p>
                                    </div>
                                    <div className="flex" >
                                        <p className="mr-2" >Treino 5:</p>
                                        <p> {workout.treino5}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Não há treinos no banco de dados.</p>
                )}
            </div>
        </section>
    )
}
