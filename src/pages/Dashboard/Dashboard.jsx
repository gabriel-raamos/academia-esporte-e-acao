export default function Dashboard() {
    const cliente = JSON.parse(localStorage.getItem('client-data'))
    const id = cliente._id

    return (
        <section>
            {id}
        </section>
    )
}