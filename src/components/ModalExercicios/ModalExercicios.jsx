import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

function ModalExercicios({ treino, id, onSave, onClose }) {
    const [editedTreino, setEditedTreino] = useState([]);
    const [newExercise, setNewExercise] = useState('');

    useEffect(() => {
        // console.log('Recebido treino:', treino); // Log para depuração
        if (treino && Array.isArray(treino)) {
            setEditedTreino([...treino]);
        } else {
            setEditedTreino([]);
        }
    }, [treino]);

    const handleChange = (exerciseIndex, value) => {
        const updatedExercises = [...editedTreino];
        updatedExercises[exerciseIndex] = value;
        setEditedTreino(updatedExercises);
    };

    const handleDelete = (exerciseIndex) => {
        const updatedExercises = editedTreino.filter((_, index) => index !== exerciseIndex);
        setEditedTreino(updatedExercises);
    };

    const handleAddExercise = () => {
        if (newExercise.trim() !== '') {
            const updatedExercises = [...editedTreino, newExercise];
            setEditedTreino(updatedExercises);
            setNewExercise('');
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`https://academia-esporte-e-acao.vercel.app/api/treino/atualizartreino/${id}`, {
                treino: editedTreino
            });

            onSave(editedTreino);
            onClose();
        } catch (error) {
            console.error('Erro ao salvar exercícios:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center">
            <div className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 mx-5 rounded-lg max-w-md md:max-w-2xl relative text-lg">
                <div className="py-2 my-7">
                    <button
                        className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 my-4 mr-8 hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
                <section>
                    <div>
                        <div className="mb-3 overflow-y-auto h-96 border-2 border-blue-700 rounded-xl">
                            {editedTreino.length === 0 ? (
                                <div className="m-3">Nenhum exercício disponível.</div>
                            ) : (
                                editedTreino.map((exercise, exerciseIndex) => (
                                    <div key={exerciseIndex} className="m-3">
                                        <div className="flex md:grid md:grid-cols-10 justify-between items-center mb-2">
                                            <div className="md:col-span-7">
                                                <div className="items-center justify-center">
                                                    <label>{`Exercício ${exerciseIndex + 1}:`}</label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name={`exercicio${exerciseIndex + 1}`}
                                                    placeholder={`Exercício ${exerciseIndex + 1}`}
                                                    value={exercise}
                                                    onChange={(e) => handleChange(exerciseIndex, e.target.value)}
                                                    className="border-2 border-blue-700 rounded-xl p-2 m-1 md:my-3 md:mr-3"
                                                />
                                            </div>
                                            <div className="flex justify-center items-baseline md:col-span-3">
                                                <button
                                                    onClick={() => handleDelete(exerciseIndex)}
                                                    className="bg-red-700 text-white rounded-full p-2 ml-2 hover:bg-red-500 font-bold hover:-translate-y-1 duration-500"
                                                >
                                                    Deletar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex justify-center mb-4">
                            <input
                                type="text"
                                value={newExercise}
                                onChange={(e) => setNewExercise(e.target.value)}
                                placeholder="Novo exercício"
                                className="border-2 border-blue-700 rounded-xl p-2 m-1 md:my-3 md:mr-3"
                            />
                            <button
                                onClick={handleAddExercise}
                                className="bg-blue-700 text-white rounded-full p-3 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500"
                            >
                                Adicionar
                            </button>
                        </div>
                        <button
                            onClick={handleSave}
                            className="bg-blue-700 text-white rounded-full p-3 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Salvar exercícios
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

ModalExercicios.propTypes = {
    treino: PropTypes.array,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalExercicios;
