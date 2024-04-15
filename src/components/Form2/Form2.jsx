import { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Button from "../Button/Button";

export default function Form2(prop) {

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
    }

    return (
        <form className="rounded-xl p-2 md:p-5  border-4 border-red-700" onSubmit={onSave} >

            <h1 className="text-center text-red-700 font-bold text-lg">{prop.titulo}</h1>

            <FormBox1
                name={name}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                date={date}
                phone={phone}
            />

            <FormBox2
                date={date}
                phone={phone}
                cpf={cpf}
                cep={cep}
                height={height}
                weight={weight}
            />

            <Button />

        </form>
    )
}

function FormBox1(prop) {
    return (

        <div>
            <Textbox
                obrigatorio={true}
                placeholder="Nome"
                valor={prop.name}
                tipo={"text"}
                whenChanged={valor => setName(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder={"Email"}
                valor={prop.email}
                tipo={"email"}
                whenChanged={valor => setEmail(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Senha"
                valor={prop.password}
                tipo={"password"}
                whenChanged={valor => setPassword(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Confirme a senha"
                valor={prop.confirmPassword}
                tipo={"password"}
                whenChanged={valor => setConfirmPassword(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Data de nascimento"
                valor={prop.date}
                tipo={"date"}
                whenChanged={valor => setDate(valor)}
            />

        </div>

    )
}

function FormBox2(prop) {

    return (

        <div>
            <Textbox
                obrigatorio={true}
                placeholder="Celular"
                valor={prop.phone}
                tipo={"number"}
                whenChanged={valor => setPhone(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="CPF"
                valor={prop.cpf}
                tipo={"number"}
                whenChanged={valor => setCpf(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="CEP"
                valor={prop.cep}
                tipo={"number"}
                whenChanged={valor => setCep(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Altura"
                valor={prop.height}
                tipo={"number"}
                whenChanged={valor => setHeight(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Peso"
                valor={prop.weight}
                tipo={"number"}
                whenChanged={valor => setWeight(valor)}
            />
        </div>

    )

}