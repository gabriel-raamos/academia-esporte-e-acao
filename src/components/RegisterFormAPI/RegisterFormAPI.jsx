import { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Button from "../Button/Button";
import axios from "axios";

export default function Form() {

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

    const [currentPage, setCurrentPage] = useState(1)

    const onSave = async (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            return alert('senha diferente')
        }

        const active = false
        const role = 'cliente'

        const userData = {
            name,
            email,
            password,
            date,
            phone,
            cpf,
            cep,
            height,
            weight,
            role,
            active
        };

        // alert(name+email+password+confirmPassword+date+phone+cpf+cep+height+weight)
        // alert(userData.active)

        try {
            await axios.post("https://pi-academia.vercel.app/api/cliente/register", userData);
            alert('Registro efetuado com sucesso.')

            // Resetar os campos após o envio bem-sucedido
            // setName('')
            // setEmail('')
            // setPassword('')
            // setConfirmPassword('')
            // setDate('')

            // setPhone('')
            // setCpf('')
            // setCep('')
            // setHeight('')
            // setWeight('')

            window.location.reload()

            setCurrentPage(1);  // blueefinir para a primeira página se necessário

        } catch (error) {
            alert('Error:', error);
        }
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <form className="rounded-xl p-5 my-5 border-4 border-blue-700" onSubmit={onSave} >

            <h1 className="text-center text-blue-700 font-bold text-lg">Ainda não tem uma conta? <br /> Cadastre-se aqui!</h1>

            {currentPage === 1 && (
                <FormBox1
                    name={name}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    date={date}

                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    setDate={setDate}
                />
            )}

            {currentPage === 2 && (
                <FormBox2
                    phone={phone}
                    cpf={cpf}
                    cep={cep}
                    height={height}
                    weight={weight}

                    setPhone={setPhone}
                    setCpf={setCpf}
                    setCep={setCep}
                    setHeight={setHeight}
                    setWeight={setWeight}
                />
            )}

            <div className="justify-center items-center flex">

                {currentPage === 1 && (
                    <div className="flex flex-col md:flex-row justify-center items-center" >
                        <button
                            onClick={nextPage}
                            className="p-5 px-10 bg-blue-700 m-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-3 duration-500"
                        >
                            Próximo
                        </button>

                        <button
                            disabled
                            className="p-5 px-10 bg-blue-400 m-3 text-white text-xl rounded-xl transition hover:bg-blue-300 hover:-translate-y-3 duration-500"
                        >
                            Enviar
                        </button>
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="flex flex-col md:flex-row justify-center items-center" >
                        <button
                            onClick={prevPage}
                            className="p-5 px-10 bg-blue-700 m-3 text-white text-xl rounded-xl transition hover:bg-blue-500 hover:-translate-y-3 duration-500"
                        >
                            Anterior
                        </button>

                        <Button text="Enviar" />
                    </div>

                )}
            </div>


        </form>
    )
}

function FormBox1(prop) {
    return (

        <div>
            <Textbox
                obrigatorio={true}
                placeholder="Nome completo"
                valor={prop.name}
                tipo={"text"}
                whenChanged={valor => prop.setName(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder={"Email"}
                valor={prop.email}
                tipo={"email"}
                whenChanged={valor => prop.setEmail(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Senha"
                valor={prop.password}
                tipo={"password"}
                whenChanged={valor => prop.setPassword(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Confirme a senha"
                valor={prop.confirmPassword}
                tipo={"password"}
                whenChanged={valor => prop.setConfirmPassword(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Data de nascimento"
                valor={prop.date}
                tipo={"date"}
                whenChanged={valor => prop.setDate(valor)}
            />

        </div>

    )
}

function FormBox2(prop) {

    return (

        <div>
            <Textbox
                obrigatorio={true}
                placeholder="Celular (apenas os números)"
                valor={prop.phone}
                tipo={"number"}
                whenChanged={valor => prop.setPhone(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="CPF (apenas os números)"
                valor={prop.cpf}
                tipo={"number"}
                whenChanged={valor => prop.setCpf(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="CEP (apenas os números)"
                valor={prop.cep}
                tipo={"number"}
                whenChanged={valor => prop.setCep(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Altura em cm (sem vírgula)"
                valor={prop.height}
                tipo={"number"}
                whenChanged={valor => prop.setHeight(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Peso em KG"
                valor={prop.weight}
                tipo={"number"}
                whenChanged={valor => prop.setWeight(valor)}
            />
        </div>

    )

}