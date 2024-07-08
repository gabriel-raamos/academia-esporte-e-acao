import PropTypes from 'prop-types';

function ModalConfirmDelete({ isOpen, onClose, onConfirm }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border-4 border-red-700 px-2 md:px-8 py-4 rounded-xl max-w-md md:max-w-3xl relative text-xl">
                <div className='py-2'>
                    <button
                        className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 m-4 mx-1 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
                <div className='pt-8 text-center'>
                    <p className='my-5' >Você tem certeza que deseja deletar este cliente?</p>
                    <div className='flex justify-between mt-4'>
                        <button
                            className="bg-blue-700 text-white rounded-full p-3 px-5 text-lg font-bold transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                            onClick={onClose}
                        >
                            Não
                        </button>
                        <button
                            className="bg-red-700 text-white rounded-full p-3 px-5 text-lg font-bold transition hover:bg-red-500 hover:-translate-y-1 duration-500"
                            onClick={onConfirm}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ModalConfirmDelete.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ModalConfirmDelete;
