import Mapa from "../../components/Mapa/Mapa";

export default function FaleConosco() {
    return (
        <section>

            <div className="grid grid-cols-1" >
                <Mapa apiKey={import.meta.env.VITE_API_KEY} />
            </div>

        </section>
    )
}