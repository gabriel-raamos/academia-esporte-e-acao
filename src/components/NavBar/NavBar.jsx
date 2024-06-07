// import axios from "axios";
import NavButton from "../NavButton/NavButton";

export default function NavBar() {

    const authHeader = localStorage.getItem('authorization')

    const logout = async () => {

        try {
            localStorage.removeItem('authorization')
            window.location.reload()
        }

        catch (error) {
            alert('Error: ', error)
        }

    }

    return (

        <section className="content-between md:flex md:justify-center" >

            <nav className="flex md:grid md:grid-cols-4 -space-x-5 md:space-x-5 items-center mb-5 md:my-5" >

                <NavButton title="Início" link="" />

                <NavButton title="Planos" link="planos" />

                <NavButton title="Fale conosco" link="faleconosco" />

                {!authHeader && (
                    <NavButton title="Login" link="login" />
                )}

                {authHeader && (
                    <div className="flex justify-center items-center h-2/3 w-2/3" >
                        {/* <p className="text-red-700 text-sm md:text-xl py-2 md:py-5 px-2 mt-7 md:mt-0 font-bold cursor-pointer" >
                            a
                        </p> */}

                        <button
                            onClick={logout}
                            className="text-red-700 text-sm md:text-xl py-2 md:py-5 px-2 mt-7 md:mt-0 rounded-full font-bold transition duration-500 hover:bg-red-700 hover:text-white"
                        >
                            Logout
                        </button>

                    </div>
                )}

            </nav>

        </section>

    )
}

