import Card2 from "../../components/Card2/Card2";
import Form from "../../components/RegisterForm/RegisterForm";

import { CgGym } from "react-icons/cg";
import { GiGymBag } from "react-icons/gi";
import { MdOutlineDirectionsBike } from "react-icons/md";

export default function Home() {
    return (
        <section>

            <div className="h-full grid md:grid-cols-2 bg-white " >

                <Card2 />

                <div className='flex justify-center items-center static'>

                    <Form />

                </div>

            </div>

            <section className="flex flex-col justify-center items-center mt-5 py-10 md:py-20 text-center bg-gray-900 text-white">
                <h1 className="font-bold text-4xl">AUMENTE SEUS LIMITES!</h1>

                <div className="grid gap-5 grid-rows-3 md:grid-cols-3 md:grid-rows-1 w-full max-w-4xl">
                    <div className="flex flex-col justify-center items-center p-5 rounded">
                        <div className="flex justify-center items-center">
                            <CgGym className="size-20 bg-gray-400 text-white rounded-full p-3" />
                        </div>
                        <h3 className="text-2xl mt-3">Equipamentos modernos</h3>
                        <p className="mt-2">Equipamentos novos, prontos para uso.</p>
                    </div>

                    <div className="flex flex-col justify-center items-center p-5 rounded">
                        <div className="flex justify-center items-center">
                            <GiGymBag className="size-20 bg-gray-400 text-white rounded-full p-3" />
                        </div>
                        <h3 className="text-2xl mt-3">Equipamentos modernos</h3>
                        <p className="mt-2">Equipamentos novos, prontos para uso.</p>
                    </div>

                    <div className="flex flex-col justify-center items-center p-5 rounded">
                        <div className="flex justify-center items-center">
                            <MdOutlineDirectionsBike className="size-20 bg-gray-400 text-white rounded-full p-3" />
                        </div>
                        <h3 className="text-2xl mt-3">Equipamentos modernos</h3>
                        <p className="mt-2">Equipamentos novos, prontos para uso.</p>
                    </div>
                </div>
            </section>


        </section>
    )
}



{/* <div className="grid grid-cols-2 gap-4" >
    <div className="size-3/4" >
        <img src='../../../public/esporteeacao1.png' className="h-auto max-w-full rounded-lg" />
    </div>

    <div className="size-3/4" >
        <img src='../../../public/esporteeacao2.png' className="h-auto max-w-full rounded-lg" />
    </div>

    <div className="size-3/4" >
        <img src='../../../public/esporteeacao3.png' className="h-auto max-w-full rounded-lg" />
    </div>

    <div className="size-3/4" >
        <img src='../../../public/esporteeacao4.png' className="h-auto max-w-full rounded-lg" />
    </div>
</div> */}