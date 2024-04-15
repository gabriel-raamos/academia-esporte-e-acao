import NavButton from "../NavButton/NavButton";
import LogoNoText from "../LogoNoText/LogoNoText";

export default function NavBar() {
    return (

        <nav className="grid grid-cols-4" >

            <div className="flex items-center justify-center text-red-700 hover:bg-red-700 hover:text-white transition duration-500 cursor-pointer" >
                {/* <img src={logo}/> */}
                <LogoNoText />
            </div>

            <NavButton title="Home" />

            <NavButton title="Planos" />

            <NavButton title="Fale conosco" />

        </nav>

    )
}

{/* <div className="flex items-center justify-center p-5 " >
    <button className="text-red-700 font-bold" >Home</button>
</div> */}