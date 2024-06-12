export default function Usuarios() {

    const role = JSON.parse(localStorage.getItem('json-data')).name

    return (
        <section className="flex justify-center items-center" >
            <p>{role}</p>
        </section>
    )
}