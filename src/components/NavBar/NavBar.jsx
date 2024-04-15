import NavButton from "../NavButton/NavButton";
// import LogoNoText from "../LogoNoText/LogoNoText";
import logo from '../../assets/2-removebg-preview.svg'

export default function NavBar() {
    return (

        <nav className="grid grid-cols-3" >

            <div className="flex items-center justify-center text-red-700 hover:bg-red-700 hover:text-white transition duration-500 cursor-pointer" >
                <img src={logo} style={{ color: 'red' }} className="w-1/3 h-1/3" />
                {/* <LogoNoText /> */}
            </div>

            <NavButton title="Planos" />

            <NavButton title="Fale conosco" />

        </nav>

    )
}

{/* <div className="flex items-center justify-center p-5 " >
    <button className="text-red-700 font-bold" >Home</button>
</div> */}