import ContactInput from "../../components/ContactInput/ContactInput";
import Mapa from "../../components/Mapa/Mapa";

export default function FaleConosco() {
    return (
        <section className="flex flex-col justify-center items-center" >

            <div className="mx-5 md:mx-40 grid grid-rows-2 md:grid-cols-2 bg-red-700 rounded-lg p-5 mb-5 text-white" >
                <div>
                    <h1 className="text-2xl font-bold" >Nos contate</h1>
                </div>

                <form>
                    <ContactInput type="text" placeholder="Nome" />
                    <ContactInput type="email" placeholder="Email" />
                    <textarea
                        id="msg"
                        name="msg"
                        placeholder="Mensagem"
                        className="w-full md:h-full text-red-700 p-2 mt-4 placeholder-red-700 rounded-lg"
                    />

                    <div className="justify-center items-center flex" >
                        <button
                            type="submit"
                            className="bg-white text-red-700 my-5 px-5 py-3 text-sm md:text-2xl rounded-full transition hover:-translate-y-3 duration-500"
                        >Enviar</button>
                    </div>

                </form>
            </div>

            <div className="mb-5" >
                <Mapa />
            </div>

        </section>
    )
}