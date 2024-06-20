import { useEffect, useState } from "react";
import propTypes from 'prop-types';
import axios from "axios";
import ModalExercicios from "../ModalExercicios/ModalExercicios"; // Importar o ModalExercicios aqui

function ModalSeries({ treino, onSave, onClose }) {
    const [editedTreino, setEditedTreino] = useState({
        treino1: treino.treino1 || [],
        treino2: treino.treino2 || [],
        treino3: treino.treino3 || [],
        treino4: treino.treino4 || [],
        treino5: treino.treino5 || []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModalExercicios, setShowModalExercicios] = useState(false); // Estado para controlar a exibição do modal

    useEffect(() => {
        setLoading(true);
        const fetchTreino = async () => {
            try {
                const response = await axios.get(`https://pi-academia.vercel.app/api/treino/mostrartreinos/${treino._id}`);

                setEditedTreino({
                    treino1: response.data.treino1 || [],
                    treino2: response.data.treino2 || [],
                    treino3: response.data.treino3 || [],
                    treino4: response.data.treino4 || [],
                    treino5: response.data.treino5 || []
                });
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchTreino();
    }, [treino._id]);

    const handleOpenModalExercicios = () => {
        setShowModalExercicios(true);
    };

    const handleCloseModalExercicios = () => {
        setShowModalExercicios(false);
    };

    const handleSave = async () => {
        const updatedTreino = {
            _id: treino._id,
            treino1: editedTreino.treino1,
            treino2: editedTreino.treino2,
            treino3: editedTreino.treino3,
            treino4: editedTreino.treino4,
            treino5: editedTreino.treino5
        };

        try {
            const response = await axios.put(`https://pi-academia.vercel.app/api/treino/atualizartreino/${updatedTreino._id}`, updatedTreino);
            onSave(response.data);
            onClose();
        } catch (error) {
            alert('Ocorreu um erro ao salvar as alterações: ' + error);
        }
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
                            {Object.keys(editedTreino).map((treinoKey, index) => (
                                <div key={index}>
                                    <div className="my-3">
                                        <div className="my-2 flex items-center justify-center">
                                            <label>{`Treino ${index + 1}: `}</label>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="bg-blue-700 text-white rounded-3xl p-2 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500 col-span-2"
                                                onClick={handleOpenModalExercicios}
                                            >
                                                Adicionar/Editar Exercícios
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={handleSave}
                                className="bg-blue-700 text-white rounded-full p-3 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500"
                            >
                                Salvar treino
                            </button>
                            {/* <p className='text-blue-700 font-bold mt-3'>
                                Utilize ; para quebra de linha.
                            </p> */}
                        </div>
                    </div>
                )}
            </div>
            {showModalExercicios && (
                <ModalExercicios
                    treino={editedTreino} // Passar o treino atual para o ModalExercicios
                    onClose={handleCloseModalExercicios}
                    onSave={(updatedExercises) => {
                        // Atualizar o estado dos exercícios após salvar no ModalExercicios
                        setEditedTreino(updatedExercises);
                    }}
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
