import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";

export default function Home() {
    return (
        <section>

            <div className="h-full grid grid-row-2 md:grid-cols-2 bg-white " >

                <div className="text-white" >

                    <div className="text-center" >

                        <Card />

                    </div>

                </div>



                <div className='flex justify-center items-center static'>

                    <Form />

                </div>

            </div>

        </section>
    )
}