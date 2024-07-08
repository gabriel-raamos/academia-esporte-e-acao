import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ModalTreinos from '../ModalTreinos/ModalTreinos'
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete'

function Modal({ isOpen, onClose, cliente, onSave, deleteUser }) {

    const [formData, setFormData] = useState({})
    const [isTreinosModalOpen, setIsTreinosModalOpen] = useState(false)
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (cliente) {
            setFormData(cliente)
            // alert(`Cliente: ${JSON.stringify(cliente._id, null, 2)}`)
        }
        // alert(cliente._id)
    }, [cliente])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        onSave(formData)
    }

    const handleOpenTreinosModal = () => {
        setIsTreinosModalOpen(true);
    };

    const handleCloseTreinosModal = () => {
        setIsTreinosModalOpen(false);
    };

    const handleOpenConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    };

    const handleCloseConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    }

    const handleConfirmDelete = () => {
        deleteUser(cliente);
        handleCloseConfirmDeleteModal();
        onClose();
    };

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 rounded-xl max-w-md md:max-w-3xl relative text-xl">
                <div className='py-2' >
                    <button
                        className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 my-4 md:mx-8 mx-1 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='pt-8' >
                    {cliente._id}
                    <div className='md:grid md:grid-cols-2 gap-5 text-lg' >
                        <div className='my-1 pt-3 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Nome:</label>
                            </div>

                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:pt-3 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Email:</label>
                            </div>

                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Telefone:</label>
                            </div>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>CPF:</label>
                            </div>

                            <input
                                type="number"
                                name="cpf"
                                value={formData.cpf || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>CEP:</label>
                            </div>

                            <input
                                type="number"
                                name="cep"
                                value={formData.cep || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Altura:</label>
                            </div>

                            <input
                                type="number"
                                name="height"
                                value={formData.height || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Peso:</label>
                            </div>

                            <input
                                type="number"
                                name="weight"
                                value={formData.weight || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Ativo:</label>
                            </div>

                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active || false}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                            />
                        </div>

                        <div className='my-1 md:my-2 rounded-xl grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Cargo:</label>
                            </div>

                            <input
                                type="text"
                                name="role"
                                value={formData.role || ''}
                                onChange={handleChange}
                                className='border-2 border-blue-700 rounded-xl p-2 col-span-6 '
                                placeholder="'admin' ou 'cliente'"
                            />
                        </div>
                    </div>

                    <div className='flex justify-between mt-3' >

                        <button
                            type="submit"
                            className="bg-blue-700 text-white rounded-full p-3 text-lg font-bold transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Salvar
                        </button>

                        <button
                            type="button"
                            className="bg-red-700 text-white rounded-full p-3 text-lg font-bold transition hover:bg-red-500 hover:-translate-y-1 duration-500"
                            onClick={handleOpenConfirmDeleteModal}
                        >
                            Deletar
                        </button>

                        <button
                            type="button"
                            onClick={handleOpenTreinosModal}
                            className="bg-blue-700 text-white rounded-full p-3 text-lg font-bold transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Treinos
                        </button>

                    </div>

                </form>
            </div>

            {isTreinosModalOpen && (
                <ModalTreinos
                    clienteID={cliente._id}
                    isOpen={isTreinosModalOpen}
                    onClose={handleCloseTreinosModal}
                />
            )}
            {isConfirmDeleteModalOpen && (
                <ModalConfirmDelete
                    isOpen={isConfirmDeleteModalOpen}
                    onClose={handleCloseConfirmDeleteModal}
                    onConfirm={handleConfirmDelete}
                />
            )}

        </div>
    )

}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cliente: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default Modal
