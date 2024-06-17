import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalSeries from '../ModalSeries/ModalSeries';

function TreinosModal({ clienteID, isOpen, onClose }) {
    const [treinos, setTreinos] = useState([]);
    const [newTreino, setNewTreino] = useState({ treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true });

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [editIndex, setEditIndex] = useState(null)

    const fetchTreinos = async () => {

        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/treino/buscarporcliente/${clienteID}`)

            const fetchedTreinos = response.data.map(treino => ({
                ...treino,
                visibility: treino.visibility !== undefined ? treino.visibility : true
            }));

            setTreinos(fetchedTreinos)
            setLoading(false)
        }

        catch (error) {
            alert('Ocorreu um erro ao puxar os dados do cliente: ' + error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchTreinos()
        }
    }, [isOpen, clienteID])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTreino({
            ...newTreino,
            [name]: value
        });
    };

    const handleAddTreino = async () => {
        const dadosParaEnviar = { ...newTreino, clienteID };
        console.log('Dados para enviar:', dadosParaEnviar);

        try {
            const response = await axios.post('https://pi-academia.vercel.app/api/treino/registrartreino', dadosParaEnviar);
            setTreinos([...treinos, response.data]);
            setNewTreino({ treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true });
        } catch (error) {
            if (error.response) {
                console.error('Erro na resposta:', error.response.data);
            } else if (error.request) {
                console.error('Erro na requisição:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
        }
    };

    const handleDeleteTreino = async (treinoID) => {

        try {
            await axios.delete(`https://pi-academia.vercel.app/api/treino/deletartreino/${treinoID}`)
            setTreinos(treinos.filter(treino => treino._id !== treinoID))
            alert('Treino deletado com sucesso')
        }

        catch (error) {
            alert('Ocorreu um erro ao deletar o treino.')
        }

    }


    const handleCheckboxChange = async (index) => {
        try {
            const updatedTreinos = [...treinos];
            updatedTreinos[index].visibility = !updatedTreinos[index].visibility;
            setTreinos(updatedTreinos);
            // alert(JSON.stringify(treinos[index].visibility))

            await axios.put(`https://pi-academia.vercel.app/api/treino/atualizartreino/${updatedTreinos[index]._id}`, updatedTreinos[index]);
        } catch (error) {
            alert('Error updating treino', error);
        }
    };

    const handleEditTreino = (index) => {
        setEditIndex(index)
    }

    const handleSaveEdit = (updatedTreino) => {
        const updatedTreinos = [...treinos]
        updatedTreinos[editIndex] = updatedTreino
        setEditIndex(null)
    }

    const handleModalClose = () => {
        setNewTreino({ treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true })
        setEditIndex(null)
        onClose()
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-3xl relative text-xl overflow-y-auto">

                {loading ? (
                    <p>Os dados estão carregando...</p>
                ) : error ? (
                    <p>Ocorreu um erro: {error}</p>
                ) : (
                    <div>
                        <div className="py-2 my-5">
                            <button
                                className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 my-4 mr-8 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                onClick={handleModalClose}
                            >
                                Fechar
                            </button>
                        </div>
                        {treinos.length === 0 ? (
                            <p className="text-center mb-10">O cliente não possui treinos cadastrados</p>
                        ) : (
                            <ul className='h-64 md:h-80 overflow-y-auto border-4 border-blue-700 rounded-lg md:grid md:grid-cols-2' >
                                {treinos.map((treino, index) => (
                                    <li key={index} className="flex justify-between items-center ml-1">
                                        <span>{`Treino ${index + 1}:`}
                                            <input
                                                type="checkbox"
                                                checked={treino.visibility}
                                                onChange={() => handleCheckboxChange(index)}
                                                className='ml-2'
                                            />
                                        </span>

                                        <div className='justify-between' >
                                            <button
                                                className='bg-blue-700 text-white rounded-full p-3 my-2 text-lg font-bold mx-1 md:mx-2 transition hover:bg-blue-500 hover:-translate-y-1 duration-500'
                                                type="button"
                                                onClick={() => handleDeleteTreino(treino._id)}
                                            >
                                                Deletar
                                            </button>
                                            <button
                                                className='bg-blue-700 text-white rounded-full p-3 my-2 text-lg font-bold mr-1 md:mr-2 transition hover:bg-blue-500 hover:-translate-y-1 duration-500'
                                                type="button"
                                                onClick={() => handleEditTreino(index)}
                                            >
                                                Editar treino
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-0">
                            <input
                                type="text"
                                name="treino1"
                                placeholder="Treino 1"
                                value={newTreino.treino1}
                                onChange={handleChange}
                                className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-0 md:my-3 md:mr-3"
                            />
                            <input
                                type="text"
                                name="treino2"
                                placeholder="Treino 2"
                                value={newTreino.treino2}
                                onChange={handleChange}
                                className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-0 md:my-3 md:mr-3"
                            />
                            <input
                                type="text"
                                name="treino3"
                                placeholder="Treino 3"
                                value={newTreino.treino3}
                                onChange={handleChange}
                                className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-0 md:my-3 md:mr-3"
                            />
                            <input
                                type="text"
                                name="treino4"
                                placeholder="Treino 4"
                                value={newTreino.treino4}
                                onChange={handleChange}
                                className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-0 md:my-3 md:mr-3"
                            />
                            <input
                                type="text"
                                name="treino5"
                                placeholder="Treino 5"
                                value={newTreino.treino5}
                                onChange={handleChange}
                                className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-0 md:my-3 md:mr-3"
                            />

                            <button
                                onClick={handleAddTreino}
                                className="bg-blue-700 text-white rounded-full p-3 md:my-0 text-lg font-bold transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                            >
                                Adicionar Treino
                            </button>
                            
                        </div>
                    </div>
                )}
            </div>

            {editIndex !== null && (
                <ModalSeries 
                    treino={treinos[editIndex]}
                    onSave={handleSaveEdit}
                    onClose={() => setEditIndex(null)}
                />
            )}
        </div>
    );
}

TreinosModal.propTypes = {
    clienteID: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TreinosModal;
