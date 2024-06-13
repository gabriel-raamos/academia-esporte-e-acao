import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TreinosModal({ clienteID, isOpen, onClose }) {
    const [treinos, setTreinos] = useState([]);
    const [newTreino, setNewTreino] = useState({ treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true });

    const fetchTreinos = async () => {
        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/treino/${clienteID}`);
            setTreinos(response.data);
        } catch (error) {
            console.error('Error fetching treinos', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchTreinos();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTreino({
            ...newTreino,
            [name]: value,
        });
    };

    const handleCheckboxChange = (index) => {
        const updatedTreinos = [...treinos];
        updatedTreinos[index].visibility = !updatedTreinos[index].visibility;
        setTreinos(updatedTreinos);
    };

    const handleAddTreino = async () => {
        try {
            const response = await axios.post('https://pi-academia.vercel.app/api/treino/registrartreino', { ...newTreino, clienteID });
            setTreinos([...treinos, response.data]);
            setNewTreino({ treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true });
        } catch (error) {
            console.error('Error adding treino', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-3xl relative text-xl">
                <div className="py-2">
                    <button
                        className="absolute top-0 right-0 bg-red-700 text-white rounded-full font-bold p-3 my-4 md:mx-8 mx-1"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
                {treinos.length === 0 ? (
                    <p className="text-center">O cliente não possui treinos cadastrados</p>
                ) : (
                    <ul>
                        {treinos.map((treino, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{`Treino ${index + 1}: ${treino.treino1}, ${treino.treino2}, ${treino.treino3}, ${treino.treino4}, ${treino.treino5}`}</span>
                                <input
                                    type="checkbox"
                                    checked={treino.visibility}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-4">
                    <input
                        type="text"
                        name="treino1"
                        placeholder="Treino 1"
                        value={newTreino.treino1}
                        onChange={handleChange}
                        className="border-2 border-red-700 rounded-xl p-2 mr-2"
                    />
                    <input
                        type="text"
                        name="treino2"
                        placeholder="Treino 2"
                        value={newTreino.treino2}
                        onChange={handleChange}
                        className="border-2 border-red-700 rounded-xl p-2 mr-2"
                    />
                    <input
                        type="text"
                        name="treino3"
                        placeholder="Treino 3"
                        value={newTreino.treino3}
                        onChange={handleChange}
                        className="border-2 border-red-700 rounded-xl p-2 mr-2"
                    />
                    <input
                        type="text"
                        name="treino4"
                        placeholder="Treino 4"
                        value={newTreino.treino4}
                        onChange={handleChange}
                        className="border-2 border-red-700 rounded-xl p-2 mr-2"
                    />
                    <input
                        type="text"
                        name="treino5"
                        placeholder="Treino 5"
                        value={newTreino.treino5}
                        onChange={handleChange}
                        className="border-2 border-red-700 rounded-xl p-2"
                    />
                    <button
                        onClick={handleAddTreino}
                        className="bg-green-700 text-white rounded-full p-3 mt-2"
                    >
                        Adicionar Treino
                    </button>
                </div>
            </div>
        </div>
    );
}

TreinosModal.propTypes = {
    clienteID: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TreinosModal;
