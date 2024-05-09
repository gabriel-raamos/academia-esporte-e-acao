import NavButton from "../NavButton/NavButton";
// import LogoNoText from "../LogoNoText/LogoNoText";
import logo from '../../assets/2-removebg-preview.svg'
import { Link } from "react-router-dom";

import login from '../../assets/user-login-button-svgrepo-com.svg'

export default function NavBar() {
    return (

        <nav className="md:grid md:grid-cols-3" >

            <div></div>

            <div className="grid grid-cols-4 space-y-5 mb-5 justify-between md:flex md:flex-row" >
                <div className="flex items-center justify-center h-5/6 w-5/6 " >
                    <Link to="/" >
                        <div>
                            <img src={logo} className="h-16 w-16 py-3 cursor-pointer hover:bg-red-700 transition duration-500 rounded-full mt-10 md:mt-5 " />
                        </div>
                    </Link>
                </div>

                <NavButton title="Planos" link="Planos" />

                <NavButton title="Fale conosco" link="Planos" />

                <div className="flex items-center justify-center h-5/6 w-5/6" >
                    <Link to="/" >
                        <div>
                            <img src={login} className="h-16 w-16 py-3 cursor-pointer hover:bg-red-700 transition duration-500 rounded-full md:-mt-4" />
                        </div>
                    </Link>
                </div>
            </div>

            <div></div>

        </nav>

    )
}

{/* <div className="flex items-center justify-center p-5 " >
    <button className="text-red-700 font-bold" >Home</button>
</div> */}