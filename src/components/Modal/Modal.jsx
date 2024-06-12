import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function Modal({ isOpen, onClose, cliente }) {

    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (cliente) {
            setFormData(cliente)
        }
    }, [cliente])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onSave(formData)
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-2 md:px-8 py-4 rounded-lg max-w-md md:max-w-3xl relative text-xl">
                <div className='py-2' >
                    <button
                        className="absolute top-0 right-0 bg-red-700 text-white rounded-full font-bold p-3 my-4 md:mx-8 mx-1"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
                <form action={handleSubmit} className='pt-8' >
                    <div className='md:grid md:grid-cols-2 gap-5 text-lg' >
                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Nome:</label>
                            </div>

                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Email:</label>
                            </div>

                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Telefone:</label>
                            </div>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>CPF:</label>
                            </div>

                            <input
                                type="number"
                                name="cpf"
                                value={formData.cpf || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>CEP:</label>
                            </div>

                            <input
                                type="number"
                                name="cep"
                                value={formData.cep || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Altura:</label>
                            </div>

                            <input
                                type="number"
                                name="height"
                                value={formData.height || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Peso:</label>
                            </div>

                            <input
                                type="number"
                                name="weight"
                                value={formData.weight || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='md:mx-3 col-span-2 items-center flex' >
                                <label>Ativo:</label>
                            </div>

                            <input
                                type="checkbox"
                                name="active"
                                value={formData.active || false}
                                onChange={() => {
                                    setFormData({
                                        ...formData,
                                        active: !formData.active
                                    })
                                }}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                            />
                        </div>

                        <div className='md:my-2 rounded-xl py-3 grid grid-cols-8' >
                            <div className='mr-5 col-span-2 items-center flex' >
                                <label>Cargo:</label>
                            </div>

                            <input
                                type="text"
                                name="role"
                                value={formData.role || ''}
                                onChange={handleChange}
                                className='border-2 border-red-700 rounded-xl p-2 col-span-6'
                                placeholder="'admin' ou 'cliente'"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-red-700 text-white rounded-full p-3 text-lg font-bold"
                    >
                        Salvar
                    </button>

                </form>
            </div>
        </div>
    )

}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cliente: PropTypes.object
}

export default Modal
