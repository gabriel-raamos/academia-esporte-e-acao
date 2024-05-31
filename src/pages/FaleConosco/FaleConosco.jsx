import ContactInput from "../../components/ContactInput/ContactInput";
import Mapa from "../../components/Mapa/Mapa";

import { GiSmartphone } from "react-icons/gi";
import { AiFillEnvironment } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function FaleConosco() {
    return (
        <section className="flex flex-col justify-center items-center" >

            <section className="mx-5 md:mx-40 grid grid-rows-2 bg-red-700 rounded-lg p-5 mb-5 text-white" >
                <div>
                    <h1 className="text-2xl font-bold" >Nos contate</h1>

                    <div className="pt-5 md:text-xl" >

                        <div className="mb-10" >
                            <div className="flex space-x-2" >
                                <AiFillEnvironment className="translate-y-1" />
                                <h3 className="font-bold">Endereço</h3>
                            </div>
                            <p>Rua tal tal tal</p>
                        </div>

                        <div className="mb-10" >
                            <div className="flex space-x-2" >
                                    <GiSmartphone className="translate-y-1" />
                                <h3 className="font-bold">Celular</h3>
                            </div>
                            <p>12 99999-9999</p>
                        </div>

                        <div className="mb-10" >
                            <div className="flex space-x-2" >
                                <MdEmail className="translate-y-1" />
                                <h3 className="font-bold">Email</h3>
                            </div>
                            <p>esporteeacao@gmail.com</p>
                        </div>

                    </div>

                </div>

                <form>
                    <ContactInput type="text" placeholder="Nome" />
                    <ContactInput type="email" placeholder="Email" />
                    <textarea
                        id="msg"
                        name="msg"
                        placeholder="Mensagem"
                        className="w-full text-red-700 p-2 mt-4 placeholder-red-700 rounded-lg"
                        rows="5"
                        cols="5"
                    />

                    <div className="justify-center items-center flex" >
                        <button
                            type="submit"
                            className="bg-white text-red-700 my-5 px-5 py-3 text-sm md:text-2xl rounded-full transition hover:-translate-y-3 duration-500"
                        >Enviar</button>
                    </div>

                </form>
            </section>

            <div className="mb-5" >
                <Mapa />
            </div>

        </section>
    )
}