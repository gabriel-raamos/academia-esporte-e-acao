export default function Dashboard() {
    const cliente = JSON.parse(localStorage.getItem('json-data'))
    const id = cliente._id

    return (
        <section className="flex justify-center items-center" >

            <div>
                <p>id sendo passado pelo header: {id}</p>
            </div>

        </section>
    )
}