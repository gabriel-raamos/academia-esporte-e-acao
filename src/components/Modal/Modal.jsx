import PropTypes from 'prop-types'

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-md relative">
                <div className='py-2' >
                    <button
                        className="absolute top-0 right-0 mt-4 mr-4 bg-red-700 text-white rounded-full font-bold p-2"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
                {children}
            </div>
        </div>
    )

}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal