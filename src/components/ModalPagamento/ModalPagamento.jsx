import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

function ModalPagamento({ isOpen, onClose, paymentAmount, handleSubmit }) {

    if (!isOpen) {
        return null
    }

    const currency = 'BRL'

    const paymentInfo = `pix:${currency};${paymentAmount}`

    return (
        <section className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <section className="bg-white border-4 border-blue-700 px-2 md:px-8 py-4 rounded-xl max-w-md md:max-w-3xl relative text-xl">
                <div className='py-2' >
                    <button
                        className="absolute top-0 right-0 bg-blue-700 text-white rounded-full font-bold p-3 my-4 md:mx-4 mx-1 transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>

                <div className='pt-12'>

                    <div className='justify-center flex'>
                        <QRCode
                            value={paymentInfo}
                            size={200}
                            level='H'
                        />
                    </div>

                    <div className='mt-5 flex justify-center' >
                        <p>Valor: ${paymentAmount}</p>
                    </div>

                    <div>
                        <button
                            onClick={handleSubmit}
                            className="p-5 px-10 bg-blue-700 my-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        >
                            Finalizar pagamento.
                        </button>
                    </div>
                </div>

            </section>
        </section>
    )
}

ModalPagamento.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    paymentAmount: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default ModalPagamento