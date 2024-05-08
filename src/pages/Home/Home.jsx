import Card2 from "../../components/Card2/Card2";
import Form from "../../components/Form/Form";

export default function Home() {
    return (
        <section>

            <div className="h-full grid grid-row-2 md:grid-cols-2 bg-white " >


                <Card2 />



                <div className='flex justify-center items-center static'>

                    <Form />

                </div>

            </div>

        </section>
    )
}