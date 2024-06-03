import Card2 from "../../components/Card2/Card2";
import Form from "../../components/RegisterForm/RegisterForm";

// import { CgGym } from "react-icons/cg";

export default function Home() {
    return (
        <section>

            <div className="h-full grid md:grid-cols-2 bg-white " >

                <Card2 />

                <div className='flex justify-center items-center static'>

                    <Form />

                </div>

            </div>

            <section className="justify-center items-center my-5 text-center" >

                <h1 className="font-bold justify-center flex text-4xl my-5" >AUMENTE SEUS LIMITES!</h1>

                <div className="grid grid-rows-3 md:grid-cols-3">
                    <div className="justify-center items-center my-5" >
                        {/* <CgGym/> */}
                        <h3 className="text-2xl" >Equipamentos modernos</h3>
                        <p>Equipamentos novos, prontos para uso.</p>
                    </div>

                    <div className="justify-center items-center my-5" >
                        <h3 className="text-2xl" >Equipamentos modernos</h3>
                        <p>Equipamentos novos, prontos para uso.</p>
                    </div>

                    <div className="justify-center items-center my-5" >
                        <h3 className="text-2xl" >Equipamentos modernos</h3>
                        <p>Equipamentos novos, prontos para uso.</p>
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