export default function Dashboard() {
    const id = JSON.parse(localStorage.getItem('json-data')).id

    return (
        <section className="flex justify-center items-center" >

            <div>
                <p>id sendo passado pelo header: {id}</p>
            </div>

        </section>
    )
}