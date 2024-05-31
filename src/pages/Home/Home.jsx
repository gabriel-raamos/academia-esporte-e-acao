import Card2 from "../../components/Card2/Card2";
import Form from "../../components/RegisterForm/RegisterForm";

export default function Home() {
    return (
        <section>

            <div className="h-full grid md:grid-cols-2 bg-white " >

                <Card2 />

                <div className='flex justify-center items-center static'>

                    <Form />

                </div>

            </div>

        </section>
    )
}