import { Link } from "react-router-dom";
import Card1 from "../../components/Card1/Card1";
import Card2 from "../../components/Card2/Card2";
import Card3 from "../../components/Card3/Card3";

export default function Planos() {
    return (
        <div className="md:grid" >
            <div className="flex flex-wrap md:grid-cols-2 justify-center" >
                <Card1 />
                <Card2 />
            </div>
            <div className="md:grid-cols-1" >
                <Card3 />
            </div>

            <div className="flex justify-center items-center" >
                <Link to="../pagamento">
                    <button
                        className="p-5 px-10 bg-blue-700 m-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                    >
                        Faça já a sua inscrição!
                    </button>
                </Link>
            </div>

        </div>
    )
}