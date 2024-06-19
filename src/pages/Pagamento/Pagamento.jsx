import { Link } from 'react-router-dom'
import PagamentoForm from '../../components/PagamentoForm/PagamentoForm'

export default function Pagamento() {

    const userData = localStorage.getItem('json-data')
    const id = userData ? JSON.parse(userData).id : null

    return (
        <section className='mt-5' >
            {id ? (
                <section className='flex justify-center items-center' >
                    <div>
                        <PagamentoForm />
                    </div>
                </section>
            ) : (
                <div className="grid grid-rows-1 justify-center items-center text-lg">
                    <Link to="../login" >
                        <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500" >
                            Faça login para acessar a página
                        </p>
                    </Link>
                </div>
            )}
        </section>
    )
}
