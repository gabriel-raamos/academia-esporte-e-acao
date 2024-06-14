import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TreinosModal({ clienteID, isOpen, onClose }) {
    const [treinos, setTreinos] = useState([]);
    const [newTreino, setNewTreino] = useState({ treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true });

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // const [updatedTreinos, setUpdatedTreinos] = useState([]);

    // const fetchTreinos = useCallback(async () => {
    //     alert('Fetching treinos for clienteID:', clienteID);
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/treino/${clienteID}`);
    //         console.log('Response data:', response.data);
    //         setTreinos(response.data);
    //     } catch (error) {
    //         console.error('Ocorreu um erro ao puxar os dados do cliente:', error);
    //     }
    // }, [clienteID]);

    // useEffect(() => {
    //     if (isOpen) {
    //         fetchTreinos();
    //     }
    // }, [isOpen, fetchTreinos]);

    const fetchTreinos = async () => {
        // alert(clienteID)

        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/treino/buscarporcliente/${clienteID}`)

            const fetchedTreinos = response.data.map(treino => ({
                ...treino,
                visibility: treino.visibility !== undefined ? treino.visibility : true
            }));

            setTreinos(fetchedTreinos)
            // alert(response.data.treino1)
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
    

    const handleCheckboxChange = async (index) => {
        try {
            const updatedTreinos = [...treinos];
            updatedTreinos[index].visibility = !updatedTreinos[index].visibility;
            setTreinos(updatedTreinos);
            // alert(JSON.stringify(treinos[index].visibility))

            await axios.put(`http://localhost:5000/api/treino/atualizartreino/${updatedTreinos[index]._id}`, updatedTreinos[index]);
        } catch (error) {
            alert('Error updating treino', error);
        }
    };

    // const handleCheckboxChange = (index) => {
    //     const updatedTreinosCopy = [...treinos];
    //     updatedTreinosCopy[index] = {
    //         ...updatedTreinos[index],
    //         visibility: !updatedTreinos[index]?.visibility
    //     };
    //     setTreinos(updatedTreinosCopy);
    // };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(
                treinos.map(async (treino) => {
                    await axios.put(`https://pi-academia.vercel.app/api/treino/atualizartreino/${treino._id}`, treino)
                })
            )
            alert('Alterações salvas com sucesso.')
            // setUpdatedTreinos([])
        } catch (error) {
            alert('Erro ao salvar mudanças: ', error)
        }
    }

    const handleModalClose = () => {
        setNewTreino({treino1: '', treino2: '', treino3: '', treino4: '', treino5: '', visibility: true})
        onClose()
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-3xl relative text-xl overflow-y-auto">

                {loading ? (
                    <p>Os dados estão carregando...</p>
                ) : error ? (
                    <p>Ocorreu um erro: {error}</p>
                ) : (
                    <div>
                        <div className="py-2 my-5">
                            <button
                                className="absolute top-0 right-0 bg-red-700 text-white rounded-full font-bold p-3 my-4 mr-8"
                                onClick={handleModalClose}
                            >
                                Fechar
                            </button>
                        </div>
                        {treinos.length === 0 ? (
                            <p className="text-center">O cliente não possui treinos cadastrados</p>
                        ) : (
                            <ul className='h-64 overflow-y-auto' >
                                {treinos.map((treino, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{`Treino ${index + 1}:`} 
                                            <input 
                                                type="checkbox" 
                                                checked={treino.visibility}
                                                onChange={() => handleCheckboxChange(index)}
                                                className='ml-2'
                                            /> 
                                        </span>

                                        <button
                                            className='bg-red-700 text-white rounded-full p-3 my-2 text-lg font-bold'
                                            type="button"
                                        >
                                            Editar treino
                                        </button>
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
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-3"
                            />
                            <input
                                type="text"
                                name="treino2"
                                placeholder="Treino 2"
                                value={newTreino.treino2}
                                onChange={handleChange}
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-3"
                            />
                            <input
                                type="text"
                                name="treino3"
                                placeholder="Treino 3"
                                value={newTreino.treino3}
                                onChange={handleChange}
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-3"
                            />
                            <input
                                type="text"
                                name="treino4"
                                placeholder="Treino 4"
                                value={newTreino.treino4}
                                onChange={handleChange}
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-3"
                            />
                            <input
                                type="text"
                                name="treino5"
                                placeholder="Treino 5"
                                value={newTreino.treino5}
                                onChange={handleChange}
                                className="border-2 border-red-700 rounded-xl p-2 m-3"
                            />
                        </div>
                        <div className='mt-4 flex justify-between' >
                            <button
                                onClick={handleSaveChanges}
                                className='bg-red-700 text-white rounded-full p-3 my-2 text-lg font-bold'
                            >
                                Salvar alterações
                            </button>
                            
                            <button
                                onClick={handleAddTreino}
                                className="bg-red-700 text-white rounded-full p-3 my-2 text-lg font-bold"
                            >
                                Adicionar Treino
                            </button>
                        </div>
                    </div>
                )}

                {/* <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-red-700 text-white rounded-full font-bold p-3 my-4 md:mx-8 mx-1"
                >
                    Fechar
                </button> */}

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
