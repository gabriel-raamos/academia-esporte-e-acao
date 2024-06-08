export default function Dashboard() {
    const cliente = JSON.parse(localStorage.getItem('json-data'))
    const id = cliente._id

    return (
        <section>
            {id}
        </section>
    )
}