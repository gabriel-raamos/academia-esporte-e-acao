import ContactInput from "../../components/ContactInput/ContactInput";
import Mapa from "../../components/Mapa/Mapa";

export default function FaleConosco() {
    return (
        <section className="flex flex-col justify-center items-center" >

            <div className="mx-5 md:mx-40 grid grid-rows-2 md:grid-cols-2 bg-red-700 rounded-lg p-5 mb-5 text-white" >
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold" >Nos contate</h1>

                    <div className="p-5 md:text-2xl" >

                        <div className="mb-10" >
                            <h3 className="font-bold">Endereço</h3>
                            <p>Rua tal tal tal</p>
                        </div>

                        <div className="mb-10" >
                            <h3 className="font-bold">Celular</h3>
                            <p>12 99999-9999</p>
                        </div>

                        <div className="mb-10" >
                            <h3 className="font-bold">Email</h3>
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
                        className="w-full text-red-700 p-2 mt-4 placeholder-red-700 rounded-lg overflow-scroll"
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
            </div>

            <div className="mb-5" >
                <Mapa />
            </div>

        </section>
    )
}