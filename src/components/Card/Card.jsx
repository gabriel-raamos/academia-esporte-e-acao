import img from '../../assets/images/invictus_go_Almaty_gym_zone_2022.jpeg'

export default function Card() {

    return (
        <section className="bg-gray-600 rounded-full p-5 m-5 overflow-hidden" >
            <div>
                <h1 className="text-3xl m-5" >Teste</h1>

                <p className="text-xl" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, fuga.</p>

                <div className="flex justify-center items-center mt-5" >
                    <img src={img} alt="" className='h-1/2 w-1/2 rounded-3xl' />
                </div>

            </div>
        </section>
    )

}