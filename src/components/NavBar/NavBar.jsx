import NavButton from "../NavButton/NavButton";
// import LogoNoText from "../LogoNoText/LogoNoText";
import logo from '../../assets/2-removebg-preview.svg'
import { Link } from "react-router-dom";

export default function NavBar() {
    return (

        <nav className="md:flex md:flex-row md:space-x-2 md:space-y-5 grid grid-cols-3 gap-5 mb-5 justify-between" >

            <div className="flex items-center justify-center h-5/6 w-5/6 " >
                <Link to="/" >
                    <div>
                        <img src={logo} className="h-16 w-16 py-3 cursor-pointer hover:bg-red-700 transition duration-500 rounded-full mt-3 md:mt-6 " />
                    </div>
                </Link>
            </div>

            <Link to="/Planos" >
                <div>
                    <NavButton title="Planos" />
                </div>
            </Link>

            <NavButton title="Fale conosco" />

        </nav>

    )
}

{/* <div className="flex items-center justify-center p-5 " >
    <button className="text-red-700 font-bold" >Home</button>
</div> */}