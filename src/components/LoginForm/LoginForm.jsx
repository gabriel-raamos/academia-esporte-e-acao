import { useState } from "react";
import Textbox from "../Textbox/Textbox";

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
            className="rounded-xl p-2 md:p-5 my-5 border-4 border-red-700"
            onSubmit={onSave}
        >

            <h1 className="text-center text-red-700 font-bold text-lg">Faça seu login aqui!</h1>

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
            
        </form>
    )
}