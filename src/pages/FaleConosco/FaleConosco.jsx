import ContactInput from "../../components/ContactInput/ContactInput";
import Mapa from "../../components/Mapa/Mapa";

export default function FaleConosco() {
    return (
        <section className="grid grid-rows-2 justify-center" >

            <div className="mx-3 grid grid-rows-2 md:grid-cols-2 bg-red-700 rounded-lg p-5 mb-5 text-white" >
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
                        className="w-full md:h-full text-red-700 p-2 mt-4 placeholder-red-700"
                    />
                </form>
            </div>

            <Mapa/>

        </section>
    )
}