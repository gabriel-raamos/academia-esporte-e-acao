// import axios from "axios";
import axios from "axios";
import NavButton from "../NavButton/NavButton";
import { useEffect, useState } from "react";

export default function NavBar() {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const authHeader = localStorage.getItem('authorization')
    // const jsonHeader = JSON.parse(localStorage.getItem('json-data'))
    // const name = localStorage.getItem('json-header')

    const fetchName = async () => {

        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/cliente/findbyid/${JSON.parse(localStorage.getItem('json-data')).id}`)

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

    const logout = async () => {

        try {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";

            localStorage.removeItem('authorization')
            localStorage.removeItem('json-data')
            window.location.href = '/'
        }

        catch (error) {
            alert('Error: ', error)
        }

    }

    useEffect(() => {
        if (authHeader) {
            fetchName();
        }
    }, [authHeader]);

    // const testName = JSON.parse(localStorage.getItem('json-header'))
    // alert(testName.name)

    // const name = jsonHeader.name || 'Cliente'

    const limitedName = name.length > 10 ? `${name.substring(0, 10)}...` : name;

    return (

        <section className="content-between flex justify-center bg-gray-900 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]" >

            <nav className="grid grid-cols-5 -space-x-3 md:space-x-5 items-center mb-5 md:my-5 gap-5 pl-5 md:pl-0" >

                <div className="pl-2 md:pl-0 justify-center" >
                    <NavButton title="Início" link="" />
                </div>

                <div className="pl-2 md:pl-0 justify-center" >
                    <NavButton title="Planos" link="planos" />
                </div>

                <div className="pl-3 md:pl-0 justify-center" >
                    <NavButton title="Fale conosco" link="faleconosco" />
                </div>

                {!authHeader ? (

                    <div className="flex justify-center items-center h-2/3 w-2/3 pl-8 md:pl-0" >
                        <button
                            className="text-white text-sm md:text-xl py-2 md:py-5 px-2 mt-7 md:mt-0 rounded-full font-bold transition duration-500 hover:bg-blue-300 focus:bg-blue-300 hover:shadow-[0px_0px_20px_10px] hover:shadow-[#1d4ed8]"
                            disabled
                        >
                            Treinos
                        </button>
                    </div>

                ) : loading ? (
                    <div className="flex justify-center items-center h-2/3 w-2/3" >
                        <div className="flex justify-center items-center h-2/3 w-2/3 pl-3 md:pl-0 " >
                            <button className="text-white text-sm md:text-xl py-2 md:py-5 px-2 mt-7 md:mt-0 rounded-full font-bold transition duration-500 hover:bg-blue-700 hover:text-white focus:bg-blue-700 hover:shadow-[0px_0px_20px_10px] hover:shadow-[#1d4ed8]" >
                                Carregando
                            </button>
                        </div>
                    </div>
                ) : error ? (
                    <div>
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-2/3 w-2/3 pl-6 md:pl-0" >

                        <NavButton title={limitedName} link='treinos' />

                    </div>
                )}

                {!authHeader && (

                    <div className="pl-3 md:pl-0 justify-center" >
                        <NavButton title="Login" link="login" />
                    </div>

                )}

                {authHeader && (
                    <div className="flex justify-center items-center h-2/3 w-2/3" >

                        <button
                            onClick={logout}
                            className="text-white text-sm md:text-xl py-2 md:py-5 px-2 mt-7 md:mt-0 rounded-full font-bold transition hover:bg-blue-700 focus:bg-blue-700 hover:white duration-500 hover:shadow-[0px_0px_20px_10px] hover:shadow-[#1d4ed8]"
                        >
                            Logout
                        </button>

                    </div>
                )}

            </nav>

        </section>

    )
}

