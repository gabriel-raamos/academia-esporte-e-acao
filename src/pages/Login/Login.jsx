import Card2 from "../../components/Card2/Card2";
import Form from "../../components/RegisterForm/RegisterForm";

export default function Login() {
    return (
        <section className="justify-center grid md:grid-cols-2">
            <Card2 />

            <div className='flex justify-center items-center'>
                <Form />
            </div>
        </section>
    )
}