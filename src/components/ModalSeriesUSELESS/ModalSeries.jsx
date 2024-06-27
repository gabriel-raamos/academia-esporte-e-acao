import { useEffect, useState } from "react";
import propTypes from 'prop-types';
import axios from "axios";
import ModalExercicios from "../ModalExercicios/ModalExercicios";

function ModalSeries({ treino, onClose, onSave }) {
    const [editedTreino, setEditedTreino] = useState({
        treino: treino.treino || []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTreino, setCurrentTreino] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchTreino = async () => {
            try {
                const response = await axios.get(`https://pi-academia.vercel.app/api/treino/mostrartreinos/${treino._id}`);
                setEditedTreino({
                    treino: response.data.treino || []
                });
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchTreino();
    }, [treino._id]);

    const handleOpenModalExercicios = (serieIndex) => {
        setCurrentTreino(serieIndex);
    };

    const handleCloseModalExercicios = () => {
        setCurrentTreino(null);
    };

    const handleSaveModalExercicios = (updatedExercises) => {
        setEditedTreino((prev) => {
            const newTreino = [...prev.treino];
            newTreino[currentTreino] = updatedExercises;
            return { ...prev, treino: newTreino };
        });
        handleCloseModalExercicios();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center">
            <div className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-lg relative text-xl">
                {loading ? (
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
                ) : error ? (
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao usar os dados: {error.message}</p>
                ) : (
                    <div>
                        <div className="py-2 my-5">
                            <button
                                className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 my-4 mr-8 hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                onClick={onClose}
                            >
                                Fechar
                            </button>
                        </div>
                        <div>
                            {editedTreino.treino.map((_, index) => (
                                <div key={index}>
                                    <div className="my-3">
                                        <div className="my-2 flex items-center justify-center">
                                            <label>{`Série ${index + 1}: `}</label>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="bg-blue-700 text-white rounded-3xl p-2 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500 col-span-2"
                                                onClick={() => handleOpenModalExercicios(index)}
                                            >
                                                Adicionar/Editar Exercícios
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {currentTreino !== null && (
                <ModalExercicios
                    treino={editedTreino.treino[currentTreino]}
                    onClose={handleCloseModalExercicios}
                    onSave={handleSaveModalExercicios}
                    id={treino._id}
                    currentTreino={currentTreino}
                />
            )}
        </div>
    );
}

ModalSeries.propTypes = {
    treino: propTypes.object.isRequired,
    onSave: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired
};

export default ModalSeries;
