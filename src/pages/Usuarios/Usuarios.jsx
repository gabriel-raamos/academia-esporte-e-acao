import { useState } from "react"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal/Modal";

export default function Usuarios() {

    const role = JSON.parse(localStorage.getItem('json-data')).role

    const [modalAberto, setModalAberto] = useState(false)

    const handleAbrirModal = () => {
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
    };

    return (
        <section>
            {role == 'admin' ? (
                <div className="flex justify-center items-center" >
                    <div>
                        <div>
                            <button
                                className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl"
                                onClick={handleAbrirModal}
                            >
                                Abrir modal
                            </button>

                            <Modal isOpen={modalAberto} onClose={handleFecharModal} >
                                <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Teste do modal</h2>
                            </Modal>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="justify-center items-center" >
                    <div className="flex justify-center items-center" >
                        <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Você não deveria estar aqui.</p>
                    </div>

                    <div className="flex justify-center items-center" >
                        <Link to='../' >
                            <button className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >
                                Clique aqui para voltar para a home page.
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    )
}