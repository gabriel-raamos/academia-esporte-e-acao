import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Treinos() {
    const [workouts, setWorkouts] = useState([]);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    const [currentSerieIndex, setCurrentSerieIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://pi-academia.vercel.app/api/cliente/findworkoutsbyid/${JSON.parse(localStorage.getItem('json-data')).id}`
                );
                const fetchedData = response.data;

                if (fetchedData.workouts) {
                    const filteredWorkouts = fetchedData.workouts.filter(workout => workout.visibility);
                    setWorkouts(filteredWorkouts);
                }

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
        setCurrentSerieIndex(0); // Reset series index when changing workout
    }, [workouts.length]);

    const prevWorkout = useCallback(() => {
        setCurrentWorkoutIndex(prevIndex => (prevIndex - 1 + workouts.length) % workouts.length);
        setCurrentSerieIndex(0); // Reset series index when changing workout
    }, [workouts.length]);

    const nextSerie = useCallback(() => {
        setCurrentSerieIndex(prevIndex => (prevIndex + 1) % 5);
    }, []);

    const prevSerie = useCallback(() => {
        setCurrentSerieIndex(prevIndex => (prevIndex - 1 + 5) % 5);
    }, []);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedNextSerie = debounce(nextSerie, 300);
    const debouncedPrevSerie = debounce(prevSerie, 300);
    const debouncedNextWorkout = debounce(nextWorkout, 300);
    const debouncedPrevWorkout = debounce(prevWorkout, 300);

    const renderSerie = () => {
        const workout = workouts[currentWorkoutIndex];
        switch (currentSerieIndex) {
            case 0:
                return workout.treino1;
            case 1:
                return workout.treino2;
            case 2:
                return workout.treino3;
            case 3:
                return workout.treino4;
            case 4:
                return workout.treino5;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="grid grid-rows-2 justify-center items-center text-lg">
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
            </div>
        );
    } else if (error) {
        return (
            <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao usar os dados: {error.message}</p>
        );
    }

    return (
        <div>
            {role === 'admin' && (
                <div className="flex justify-center items-center">
                    <Link to="../usuarios">
                        <button
                            className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Ir para Usuários.
                        </button>
                    </Link>
                </div>
            )}
            {workouts.length > 0 ? (
                <section>
                    <div className="flex justify-center items-center">
                        <h2 className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">
                            Informação sobre os treinos:
                        </h2>
                    </div>

                    <div className='flex justify-center'>
                        <div className='border-4 border-blue-700 rounded-xl' >
                            <div className='flex justify-center text-blue-700 font-bold my-5 text-lg' >
                                <p>Treino {currentWorkoutIndex + 1} de {workouts.length}</p>
                            </div>
                            <div className="flex justify-center text-lg rounded-xl p-5 my-5 mx-3 border-4 text-blue-700 border-blue-700 font-bold md:m-5 whitespace-pre-line overflow-y-auto">
                                <div>
                                    <div className="flex justify-center items-center mb-4">
                                        <p>Série {currentSerieIndex + 1} de 5</p>
                                    </div>
                                    <div className="flex items-center border-blue-700 border-4 m-2 p-5 rounded-lg">
                                        <p>{renderSerie()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={debouncedPrevSerie}
                                    className="bg-blue-700 active:bg-blue-900 text-white rounded-full font-bold p-3 mx-2 my-5 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                >
                                    Série Anterior
                                </button>
                                <button
                                    onClick={debouncedNextSerie}
                                    className="bg-blue-700 active:bg-blue-900 text-white rounded-full font-bold p-3 mx-2 my-5 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                >
                                    Próxima Série
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={debouncedPrevWorkout}
                            className="bg-blue-700 active:bg-blue-900 text-white rounded-full font-bold p-3 mx-2 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Treino Anterior
                        </button>
                        <button
                            onClick={debouncedNextWorkout}
                            className="bg-blue-700 active:bg-blue-900 text-white rounded-full font-bold p-3 mx-2 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Próximo Treino
                        </button>
                    </div>
                </section>
            ) : (
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">
                    Não há treinos disponíveis.
                </p>
            )}
        </div>
    );
}
