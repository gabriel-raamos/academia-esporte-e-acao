export default function Textbox(prop) {

    // const placeholderModificada = `${placeholder}`

    const whenTyped = (event) => {
        prop.whenChanged(event.target.value)
    }

    return (
        <section className="m-6 md:mx-0 p-3 rounded-lg bg-white border-4 border-red-700 text-gray-800 flex" >
            <input
                    required={prop.obrigatorio == true}
                    value={prop.valor}
                    placeholder={prop.placeholder}
                    type={prop.tipo}
                    onChange={whenTyped}
                    className="md:w-80"
                />
        </section>
    )
}