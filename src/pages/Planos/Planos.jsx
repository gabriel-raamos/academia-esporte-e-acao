import { Link } from "react-router-dom";
import Card1 from "../../components/Card1/Card1";
import Card2 from "../../components/Card2/Card2";
import Card3 from "../../components/Card3/Card3";

export default function Planos() {

    const userData = localStorage.getItem('json-data')
    const id = userData ? JSON.parse(userData).id : null

    return (
        <div className="md:grid" >

            {id ? (
                <div className="flex justify-center items-center" >
                    <Link to="../pagamento">
                        <button
                            className="bg-blue-700 text-white rounded-full font-bold p-5 my-3 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500" 
                        >
                            Adquira um plano!
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex justify-center items-center" >
                    <button
                        className="bg-blue-700 text-white rounded-full font-bold p-5 my-3 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                        disabled
                    >
                        Faça login para adquirir um plano!
                    </button>
                </div>
            )}

            <div className="flex flex-wrap md:grid-cols-2 justify-center" >
                <Card1 />
                <Card2 />
            </div>
            <div className="md:grid-cols-1" >
                <Card3 />
            </div>

        </div>
    )
}