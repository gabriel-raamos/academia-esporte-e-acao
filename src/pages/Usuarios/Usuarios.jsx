import { Link } from "react-router-dom"

export default function Usuarios() {

    const role = JSON.parse(localStorage.getItem('json-data')).role

    return (
        <section>
            {role == 'admin' ? (
                <div className="flex justify-center items-center" >
                    <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >{role}</p>
                </div>
            ) : (
                <div className="justify-center items-center" >
                    <div className="flex justify-center items-center" >
                        <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Você não deveria estar aqui.</p>
                    </div>

                    <div className="flex justify-center items-center" >
                        <Link to='../' >
                            <button className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >
                                Clique aqui para voltar para a home page.
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    )
}