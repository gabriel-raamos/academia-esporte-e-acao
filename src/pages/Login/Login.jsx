import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Login() {
    return (
        <section className="justify-center grid md:grid-cols-2">

            <div className="flex justify-center items-center" >
                <LoginForm />
            </div>

            <div className='flex justify-center items-center'>
                <RegisterForm />
            </div>
        </section>
    )
}