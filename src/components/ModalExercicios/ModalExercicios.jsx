import { useState } from "react";
import propTypes from 'prop-types';

function ModalExercicios({ treino, onSave, onClose }) {
    const [editedTreino, setEditedTreino] = useState({
        treino1: treino.treino1 || [],
        treino2: treino.treino2 || [],
        treino3: treino.treino3 || [],
        treino4: treino.treino4 || [],
        treino5: treino.treino5 || []
    });

    const handleChange = (treinoNumber, exerciseIndex, value) => {
        const updatedExercises = [...editedTreino[treinoNumber]];
        updatedExercises[exerciseIndex] = value;
        setEditedTreino({
            ...editedTreino,
            [treinoNumber]: updatedExercises
        });
    };

    const handleSave = () => {
        onSave(editedTreino);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center">
            <div className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-lg relative text-xl"><div className="py-2 my-5">
                <button
                    className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 my-4 mr-8 hover:bg-blue-500 hover:-translate-y-1 duration-500"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
                <div>
                    <div className="mb-3" >
                        {Object.keys(editedTreino).map((treinoKey, index) => (
                            <div key={index}>
                                <div className="flex">
                                    <div className="items-center justify-center mr-5">
                                        <label className="mr-10">{`Exercício ${index + 1}: `}</label>
                                    </div>
                                    {Array.isArray(editedTreino[treinoKey]) ? (
                                        editedTreino[treinoKey].map((exercise, exerciseIndex) => (
                                            <input
                                                key={exerciseIndex}
                                                type="text"
                                                name={`exercicio${exerciseIndex + 1}`}
                                                placeholder={`Exercício ${exerciseIndex + 1}`}
                                                value={exercise}
                                                onChange={(e) => handleChange(treinoKey, exerciseIndex, e.target.value)}
                                                className="border-2 border-blue-700 rounded-xl p-2 mx-2 m-1 md:my-3 md:mr-3"
                                            />
                                        ))
                                    ) : (
                                        <p>Nenhum exercício encontrado para este treino.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-700 text-white rounded-full p-3 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500"
                    >
                        Salvar Exercícios
                    </button>
                </div>
            </div>
        </div>
    );
}

ModalExercicios.propTypes = {
    treino: propTypes.object.isRequired,
    onSave: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired
};

export default ModalExercicios;
