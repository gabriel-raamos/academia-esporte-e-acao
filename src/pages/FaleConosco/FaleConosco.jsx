import ContactInput from "../../components/ContactInput/ContactInput";
import Mapa from "../../components/Mapa/Mapa";

import { GiSmartphone } from "react-icons/gi";
import { AiFillEnvironment } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function FaleConosco() {
    return (
        <section className="flex flex-col justify-center items-center mt-5 bg-azulzinho" >

            <section className="mx-10 md:mx-40 grid grid-rows-2 bg-blue-700 rounded-lg p-2 md:p-5 mb-5 md:mt-8 text-white hover:scale-105 transition duration-500" >
                <div>
                    <h1 className="text-2xl font-bold" >Nos contate</h1>

                    <div className="mt-5 text-xl" >

                        <div className="mb-10 flex" >
                            <AiFillEnvironment className="translate-y-2 mr-5 h-10 w-10" />
                            <div>
                                <h3 className="font-bold">Endereço</h3>
                                <p>Av. Prof. Francisco Antônio Lacaz Neto, <br />105 - Beira Rio I, Guaratinguetá - SP, <br />12517-550</p>
                            </div>
                        </div>

                        <div className="mb-10 flex" >
                            <GiSmartphone className="translate-y-2 mr-5 h-10 w-10" />
                            <div>
                                <h3 className="font-bold">Contato</h3>
                                <p>12 3125-9225</p>
                            </div>
                        </div>

                        <div className="mb-10 flex" >
                            <MdEmail className="translate-y-2 mr-5 h-10 w-10" />
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p>acadesporteeacao@gmail.com</p>
                            </div>
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
                        className="w-full text-blue-700 p-2 mt-4 placeholder-blue-700 rounded-lg"
                        rows="5"
                        cols="5"
                    />

                    <div className="justify-center items-center flex" >
                        <button
                            type="submit"
                            className="bg-white text-blue-700 my-5 px-5 py-3 text-sm md:text-2xl rounded-full transition hover:-translate-y-1 duration-500"
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
