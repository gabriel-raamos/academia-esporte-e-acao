import img from '../../assets/images/invictus_go_Almaty_gym_zone_2022.jpeg'

export default function Card() {

    return (
        <section className="bg-red-700 rounded-3xl p-5 m-5 overflow-hidden" >
            <div>
                <h1 className="text-3xl m-5" >Nosso plano mais acessível</h1>

                <p className="text-xl my-3" >Acesso às nossas instalações 5 vezes por semana</p>

                <p className="text-xl my-3" >Acesso aos vestuários e chuveiros</p>

                <p className="text-xl my-3" >Agendamento de avaliação física</p>

                <p className="text-xl my-3" >Aulas em grupo</p>

                <p className="text-xl my-3" >Eventos especiais e Workshops</p>

                <div className="flex justify-center items-center mt-5" >
                    <img src={img} alt="" className='h-5/6 w-5/6 rounded-3xl' />
                </div>

            </div>
        </section>
    )

}