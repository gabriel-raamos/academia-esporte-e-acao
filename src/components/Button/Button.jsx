export default function Button() {
    return (

        <section className="justify-center items-center flex">
            <button 
                type="submit" 
                className="p-5 px-10 bg-red-700 m-3 text-white text-xl rounded-xl transition hover:bg-gray-500 hover:-translate-y-3 duration-500" 
            >
                Enviar
            </button>
        </section>

    )
}