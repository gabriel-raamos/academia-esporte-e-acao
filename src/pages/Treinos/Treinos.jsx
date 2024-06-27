import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Treinos() {
    const [workouts, setWorkouts] = useState([]);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://pi-academia.vercel.app/api/cliente/findworkoutsbyid/${JSON.parse(localStorage.getItem('json-data')).id}`
                );
                const fetchedData = response.data;

                console.log('Fetched Data:', fetchedData);

                if (fetchedData.workouts) {
                    const filteredWorkouts = fetchedData.workouts
                        .filter(workout => workout.visibility)
                        .map(workout => ({
                            ...workout,
                            treino: Array.isArray(workout.treino) ? workout.treino : ['']
                        }));

                    console.log('Filtered Workouts:', filteredWorkouts);
                    setWorkouts(filteredWorkouts);
                }

                setActive(fetchedData.active);
                setRole(fetchedData.role);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const nextWorkout = useCallback(() => {
        setCurrentWorkoutIndex(prevIndex => (prevIndex + 1) % workouts.length);
    }, [workouts.length]);

    const prevWorkout = useCallback(() => {
        setCurrentWorkoutIndex(prevIndex => (prevIndex - 1 + workouts.length) % workouts.length);
    }, [workouts.length]);

    const renderSeries = () => {
        if (workouts.length === 0) {
            return 'Nenhum treino disponível';
        }
        const workout = workouts[currentWorkoutIndex];
        return workout.treino.map((serie, index) => (
            <div key={index} className="flex items-center justify-center rounded-lg">
                <p className="justify-center flex">{Array.isArray(serie) ? serie.join('\n') : serie}</p>
            </div>
        ));
    };

    if (!localStorage.getItem('json-data')) {
        return (
            <div className='flex justify-center items-center'>
                <Link to='../login'>
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Verifique se está logado</p>
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="grid grid-rows-2 justify-center items-center text-lg">
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
            </div>
        );
    } else if (error) {
        return (
            <div className="grid grid-rows-2 justify-center items-center text-lg">
                <div className='flex justify-center items-center'>
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao usar os dados: {error.message}</p>
                </div>
                <div className='flex justify-center items-center'>
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Verifique se está logado</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {active ? (
                <div>
                    {role === 'admin' && (
                        <div className="grid grid-rows-2 justify-center items-center">
                            <div className="flex justify-center">
                                <Link to="../usuarios">
                                    <button
                                        className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                    >
                                        Ir para Usuários
                                    </button>
                                </Link>
                            </div>

                            <div className="flex justify-center">
                                <Link to="../pagamentolista">
                                    <button
                                        className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                    >
                                        Ir para histórico de pagamentos
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {workouts.length > 0 ? (
                        <section className="mb-5">
                            <div className="flex justify-center items-center">
                                <h2 className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">
                                    Informação sobre os treinos
                                </h2>
                            </div>

                            <div className="flex justify-center">
                                <div className="border-4 border-blue-700 rounded-xl">
                                    <div className="flex justify-center text-blue-700 font-bold my-5 text-lg">
                                        <p>Treino {currentWorkoutIndex + 1} de {workouts.length}</p>
                                    </div>
                                    <div className="flex justify-center text-lg rounded-xl p-5 my-5 mx-3 border-4 text-blue-700 border-blue-700 font-bold md:m-5 whitespace-pre-line overflow-y-auto">
                                        <div className="fixed-width md:fixed-lg-width">
                                            {renderSeries()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={prevWorkout}
                                    className="bg-blue-700 active:bg-blue-900 text-white rounded-full font-bold p-3 mx-2 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                >
                                    Treino Anterior
                                </button>
                                <button
                                    onClick={nextWorkout}
                                    className="bg-blue-700 active:bg-blue-900 text-white rounded-full font-bold p-3 mx-2 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                >
                                    Próximo Treino
                                </button>
                            </div>
                        </section>
                    ) : (
                        <div className="grid grid-rows-2 justify-center items-center text-lg">
                            <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Não há treinos disponíveis</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-rows-2 justify-center items-center text-lg">
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Usuário sem plano mensal para exercícios</p>
                </div>
            )}
        </div>
    );
}
