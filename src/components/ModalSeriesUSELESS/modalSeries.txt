import { useEffect, useState } from "react"
import propTypes from 'prop-types'
import axios from "axios"

function ModalSeries({ treino, onSave, onClose }) {

    const [editedTreino, setEditedTreino] = useState({
        treino1: treino.treino1 || '',
        treino2: treino.treino2 || '',
        treino3: treino.treino3 || '',
        treino4: treino.treino4 || '',
        treino5: treino.treino5 || ''
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTreino = async () => {
            try {
                const response = await axios.get(`https://pi-academia.vercel.app/api/treino/mostrartreinos/${treino._id}`)

                setEditedTreino({
                    treino1: response.data.treino1,
                    treino2: response.data.treino2,
                    treino3: response.data.treino3,
                    treino4: response.data.treino4,
                    treino5: response.data.treino5
                })
                setLoading(false)
            }

            catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchTreino()
    }, [treino._id])

    const handleChange = (e) => {
        const { name, value } = e.target

        setEditedTreino({
            ...editedTreino,
            [name]: value
        })
    }

    const handleSave = async () => {
        const updatedTreino = {
            _id: treino._id,
            treino1: editedTreino.treino1,
            treino2: editedTreino.treino2,
            treino3: editedTreino.treino3,
            treino4: editedTreino.treino4,
            treino5: editedTreino.treino5
        }

        try {
            const response = await axios.put(`https://pi-academia.vercel.app/api/treino/atualizartreino/${updatedTreino._id}`, updatedTreino)
            onSave(response.data)
            onClose()
        }

        catch (error) {
            alert('Ocorreu um erro ao salvar as alterações: ' + error)
        }
    }

    // if (loading) {
    //     return (
    //         <div className="grid grid-rows-1 justify-center items-center text-lg">
    //             <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
    //         </div>
    //     )
    // }

    // if (error) {
    //     return (
    //         <div className="grid grid-rows-1 justify-center items-center text-lg">
    //             <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao usar os dados: {error.message}</p>
    //         </div>
    //     )
    // }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center" >
            <div className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-lg relative text-xl" >
                {loading ? (
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
                ) : error ? (
                    <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
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
                            <div>
                                <div className="grid grid-cols-5" >
                                    <div className="col-span-2 flex items-center" >
                                        <label>Primeiro treino: </label>
                                    </div>

                                    <input
                                        type="text"
                                        name="treino1"
                                        placeholder="Treino 1"
                                        value={editedTreino.treino1}
                                        onChange={handleChange}
                                        className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5" >
                                    <div className="col-span-2 flex items-center" >
                                        <label>Segundo treino: </label>
                                    </div>

                                    <input
                                        type="text"
                                        name="treino2"
                                        placeholder="Treino 2"
                                        value={editedTreino.treino2}
                                        onChange={handleChange}
                                        className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5" >
                                    <div className="col-span-2 flex items-center" >
                                        <label>Terceiro treino: </label>
                                    </div>

                                    <input
                                        type="text"
                                        name="treino3"
                                        placeholder="Treino 3"
                                        value={editedTreino.treino3}
                                        onChange={handleChange}
                                        className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5" >
                                    <div className="col-span-2 flex items-center" >
                                        <label>Quarto treino: </label>
                                    </div>

                                    <input
                                        type="text"
                                        name="treino4"
                                        placeholder="Treino 4"
                                        value={editedTreino.treino4}
                                        onChange={handleChange}
                                        className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5" >
                                    <div className="col-span-2 flex items-center" >
                                        <label>Quinto treino: </label>
                                    </div>

                                    <input
                                        type="text"
                                        name="treino5"
                                        placeholder="Treino 5"
                                        value={editedTreino.treino5}
                                        onChange={handleChange}
                                        className="border-2 border-blue-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                className="bg-blue-700 text-white rounded-full p-3 md:my-0 text-lg font-bold hover:bg-blue-500 hover:-translate-y-1 duration-500"
                            >
                                Salvar treino
                            </button>
                            <p className='text-blue-700 font-bold mt-3' >
                                Utilize ; para quebra de linha.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

ModalSeries.propTypes = {
    treino: propTypes.object.isRequired,
    onSave: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired
}

export default ModalSeries
