export default function Card1() {

    return (
        <section className="flex justify-center items-center">
            <div className="bg-blue-700 rounded-3xl p-5 m-5 overflow-hidden text-white text-center flex flex-col select-none justify-between hover:scale-105 transition duration-500" >
                <h1 className="text-3xl m-5 font-bold" >Nosso plano mais barato!</h1>

                <p className="text-xl my-3" >Acesso às nossas instalações 3 vezes por semana</p>

                <p className="text-xl my-3" >Agendamento de avaliação física</p>

                <p className="text-xl my-3" >Eventos especiais e Workshops</p>

                <h3 className="text-5xl m-5 font-bold" >R$ 80,00</h3>
            </div>
        </section>

    )

}