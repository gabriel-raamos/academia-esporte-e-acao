export default function Dashboard() {
    const cliente = JSON.parse(localStorage.getItem('json-data'))
    const id = cliente._id

    return (
        <section className="flex justify-center items-center" >

            <div>
                {id}

                <p>zap</p>
            </div>

        </section>
    )
}