import NavButton from "../NavButton/NavButton";
// import LogoNoText from "../LogoNoText/LogoNoText";
import logo from '../../assets/2-removebg-preview.svg'

export default function NavBar() {
    return (

        <nav className="md:flex md:flex-row md:space-x-2 md:space-y-5 grid grid-cols-3 gap-10   " >

            <div className="flex items-center justify-center h-5/6 w-5/6 " >
                <img src={logo} className="w-5/6 h-5/6 py-3 cursor-pointer hover:bg-red-700 transition duration-500 rounded-full mt-2 " />
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