import { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Button from "../Button/Button";

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSave = (e) => {
        e.preventDefault()

        setEmail('')
        setPassword('')
    }

    return (
        <form
            className="rounded-xl p-5 my-5 border-4 text-red-700 border-red-700"
            onSubmit={onSave}
        >

            <h1 className="text-center text-lg font-bold">Faça seu login aqui!</h1>

            <Textbox
                obrigatorio={true}
                placeholder="Email"
                valor={email}
                tipo={"email"}
                whenChanged={valor => setEmail(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Senha"
                valor={password}
                tipo={"password"}
                whenChanged={valor => setPassword(valor)}
            />

            <div className="flex justify-center items-center my-5" >
                <input type="checkbox" className="mr-3" />
                <h3>Manter-se conectado</h3>
            </div>

            <div className="flex justify-center items-center my-5" >
                <button>Esqueci minha senha</button>
            </div>

            <div className="flex justify-center items-center" >
                <Button text="Entrar" />
            </div>

        </form>
    )
}