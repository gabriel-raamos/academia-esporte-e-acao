import { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Button from "../Button/Button";
import axios from "axios";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSave = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        try {
            const response = await axios.post("https://pi-academia.vercel.app/api/cliente/logarcliente", userData);

            localStorage.setItem('authorization', response.data.accessToken)
            localStorage.setItem('json-data', JSON.stringify(response.data.clienteData))

            // alert("ID do usuário: " + response.data.cliente._id)
            // alert("Header -> authorization: " + localStorage.getItem('authorization'))
            // alert(response.data.cliente.name)

            // const testName = JSON.parse(localStorage.getItem('json-header'))
            // alert(testName.name)


            // alert('Login efetuado com sucesso.');
            alert(response.data.message)

            // window.location.reload()
            window.location.href = 'https://pi-academia.vercel.app/'
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

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
                whenChanged={(valor) => setEmail(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Senha"
                valor={password}
                tipo={"password"}
                whenChanged={(valor) => setPassword(valor)}
            />

            {/* <div className="flex justify-center items-center my-5">
                <input type="checkbox" className="mr-3" />
                <h3>Manter-se conectado</h3>
            </div> */}

            <div className="flex justify-center items-center my-2 font-bold">
                <button type="button">Esqueci minha senha</button>
            </div>

            <div className="flex justify-center items-center">
                <Button text="Entrar" type="submit"/>
            </div>
        </form>
    );
}
