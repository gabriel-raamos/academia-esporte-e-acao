import { useEffect, useState } from "react";
import Card2 from "../../components/Card2/Card2";
import RegisterFormAPI from "../../components/RegisterFormAPI/RegisterFormAPI";

import { CgGym } from "react-icons/cg";
import { GiGymBag } from "react-icons/gi";
import { MdOutlineDirectionsBike } from "react-icons/md";
import axios from "axios";
// import APITest from "../../components/APITest/APITest";

export default function Home() {

    const authHeader = localStorage.getItem('authorization')

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    const fetchName = async () => {
        const id = JSON.parse(localStorage.getItem('json-data')).id

        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/cliente/findbyid/${id}`)

            const name = response.data.name
            setName(name)
        }

        catch (error) {
            console.log(error)
            setError(error)
        }

        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (authHeader) {
            fetchName();
        }
    }, [authHeader]);

    return (
        <section className="select-none font-comicneue" >
            <section className="bg-gym3 bg-cover bg-no-repeat h-90vh items-center flex justify-center static bg-fixed bg-blend-darken bg-black bg-opacity-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]" >
                <div className="flex justify-center items-center" >
                    <div className="justify-center items-center flex bg-blue-700 p-3 bg-gradient-to-br from blue-700 text-white rounded-full font-bold hover:shadow-[0px_0px_20px_10px] hover:shadow-[#1d4ed8] transition duration-500" >
                        <div className="select-none" >
                            <h1 className="text-xl p-3 md:text-4xl md:p-8" >
                                Seja bem vindo à academia <br />
                                <span className="flex justify-center">
                                    Esporte e Ação!
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="h-full grid md:grid-cols-2 bg-white" >

                <Card2 />

                {authHeader ? (
                    <section className="flex justify-center items-center text-3xl font-bold">
                        <div className="bg-blue-700 rounded-3xl p-5 m-5 overflow-hidden text-white text-center flex flex-col justify-between hover:scale-105 transition duration-500">
                            {loading ? (
                                <div>
                                    <p>Carregando...</p>
                                </div>
                            ) : error ? (
                                <div>
                                    <p>Ocorreu um erro: {error.message}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Seja bem vindo {name}!</p>
                                </div>
                            )}
                        </div>
                    </section>
                ) : (
                    <div className='flex justify-center items-center static'>
                        <RegisterFormAPI />
                    </div>
                )}

            </section>

            <section className="flex flex-col justify-center items-center mt-5 py-10 md:py-20 text-center bg-gray-900 text-white">
                <h1 className="font-bold text-4xl">AUMENTE SEUS LIMITES!</h1>

                <div className="grid gap-5 grid-rows-3 md:grid-cols-3 md:grid-rows-1 w-full max-w-4xl">
                    <div className="flex flex-col justify-center items-center p-5 rounded">
                        <div className="flex justify-center items-center">
                            <CgGym className="size-20 bg-gray-700 text-white rounded-xl p-3 hover:bg-white hover:text-gray-700 duration-500" />
                        </div>
                        <h3 className="text-2xl mt-3 font-bold">Ficha de treinamento</h3>
                        <p className="mt-2">Sendo aluno você contará com uma ficha de treinamento para melhor te auxiliar.</p>
                    </div>

                    <div className="flex flex-col justify-center items-center p-5 rounded">
                        <div className="flex justify-center items-center">
                            <GiGymBag className="size-20 bg-gray-700 text-white rounded-xl p-3 hover:bg-white hover:text-gray-700 duration-500" />
                        </div>
                        <h3 className="text-2xl mt-3 font-bold">Loja de suplementos</h3>
                        <p className="mt-2">Contamos com grandes variedades de suplementos, e alguns para consumos em doses.</p>
                    </div>

                    <div className="flex flex-col justify-center items-center p-5 rounded">
                        <div className="flex justify-center items-center">
                            <MdOutlineDirectionsBike className="size-20 bg-gray-700 text-white rounded-xl p-3 hover:bg-white hover:text-gray-700 duration-500" />
                        </div>
                        <h3 className="text-2xl mt-3 font-bold">Equipamentos modernos</h3>
                        <p className="mt-2">Equipamentos novos, prontos para uso.</p>
                    </div>
                </div>
            </section>

            {/* <section>
                <APITest/>
            </section> */}

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