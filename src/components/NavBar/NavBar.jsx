// import axios from "axios";
import NavButton from "../NavButton/NavButton";

export default function NavBar() {

    const authHeader = localStorage.getItem('authorization')
    // const jsonHeader = JSON.parse(localStorage.getItem('json-data'))
    // const name = localStorage.getItem('json-header')

    const logout = async () => {

        try {
            localStorage.removeItem('authorization')
            localStorage.removeItem('json-data')
            window.location.href = 'https://pi-academia.vercel.app/'
        }

        catch (error) {
            alert('Error: ', error)
        }

    }

    // const testName = JSON.parse(localStorage.getItem('json-header'))
    // alert(testName.name)

    // const name = jsonHeader.name || 'Cliente'

    return (

        <section className="content-between flex justify-center" >

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

                {!authHeader && (

                    <button
                        className="text-red-400 text-sm md:text-xl py-2 md:py-5  md:px-2 mt-7 md:mt-0 rounded-full font-bold transition hover:bg-red-400 hover:text-white duration-500"
                        disabled
                    >
                        Dashboard
                    </button>

                )}

                {!authHeader && (

                    <div className="pl-3 md:pl-0 justify-center" >
                        <NavButton title="Login" link="login" />
                    </div>

                )}

                {authHeader && (
                    <div className="flex justify-center items-center h-2/3 w-2/3 pl-3 md:pl-0" >

                        <NavButton title={JSON.parse(localStorage.getItem('json-data')).name} link='dashboard' />

                    </div>
                )}

                {authHeader && (
                    <div className="flex justify-center items-center h-2/3 w-2/3" >

                        <button
                            onClick={logout}
                            className="text-red-700 text-sm md:text-xl py-2 md:py-5 px-2 mt-7 md:mt-0 rounded-full font-bold transition hover:bg-red-700 hover:text-white duration-500"
                        >
                            Logout
                        </button>

                    </div>
                )}

            </nav>

        </section>

    )
}

