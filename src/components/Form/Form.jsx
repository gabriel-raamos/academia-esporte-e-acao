import { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Button from "../Button/Button";

export default function Form(prop) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [date, setDate] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [cep, setCep] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [objective, setObjective] = useState('')

    

    const onSave = (e) => {
        e.preventDefault()

        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setDate('')
        setPhone('')
        setCpf('')
        setCep('')
        setHeight('')
        setWeight('')
        setObjective('')
    }

    return (
        <form className="rounded-xl p-2 m-2 md:p-5 md:m-5 border-4 border-red-700" onSubmit={onSave} >

            <h1 className="text-center text-red-700 font-bold text-lg">{prop.titulo}</h1>

            <Textbox
                obrigatorio={true}
                placeholder="Nome"
                valor={name}
                tipo={"text"}
                whenChanged={valor => setName(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder={"Email"}
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

            <Textbox
                obrigatorio={true}
                placeholder="Confirme a senha"
                valor={confirmPassword}
                tipo={"password"}
                whenChanged={valor => setConfirmPassword(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Data de nascimento"
                valor={date}
                tipo={"date"}
                whenChanged={valor => setDate(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Celular"
                valor={phone}
                tipo={"number"}
                whenChanged={valor => setPhone(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="CPF"
                valor={cpf}
                tipo={"number"}
                whenChanged={valor => setCpf(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="CEP"
                valor={cep}
                tipo={"number"}
                whenChanged={valor => setCep(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Altura"
                valor={height}
                tipo={"number"}
                whenChanged={valor => setHeight(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Peso"
                valor={weight}
                tipo={"number"}
                whenChanged={valor => setWeight(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Objetivo"
                valor={objective}
                tipo={"text"}
                whenChanged={valor => setObjective(valor)}
            />

            <Button />

        </form>
    )
}