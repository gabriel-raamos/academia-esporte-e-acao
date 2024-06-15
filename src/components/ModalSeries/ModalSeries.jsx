import { useState } from "react"
import propTypes from 'prop-types'

function ModalSeries({ treino, onSave, onClose }) {

    const [editedTreino, setEditedTreino] = useState({
        treino1: treino.treino1 || '',
        treino2: treino.treino2 || '',
        treino3: treino.treino3 || '',
        treino4: treino.treino4 || '',
        treino5: treino.treino5 || ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setEditedTreino({
            ...editedTreino,
            [name]: value
        })
    }

    const handleSave = () => {
        onSave({
            _id: treino._id,
            treino1: editedTreino.treino1,
            treino2: editedTreino.treino2,
            treino3: editedTreino.treino3,
            treino4: editedTreino.treino4,
            treino5: editedTreino.treino5
        })
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center" >
            <div className="bg-white border-4 border-red-700 px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-lg relative text-xl" >
                <div className="py-2 my-5">
                    <button
                        className="absolute top-0 right-0 bg-red-700 text-white rounded-full font-bold p-3 my-4 mr-8"
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
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
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
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
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
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
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
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
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
                                className="border-2 border-red-700 rounded-xl p-2 mr-2 m-1 ml-2 md:my-3 md:mr-3 col-span-3"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-red-700 text-white rounded-full p-3 md:my-0 text-lg font-bold"
                    >
                        Salvar treino
                    </button>
                </div>
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