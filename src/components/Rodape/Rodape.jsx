export default function Rodape() {

    const date = new Date()

    return (
        <footer className="flex flex-col" >
            <div className="bg-slate-800 text-center bottom-0 p-4 text-white footer">
                    © {date.getFullYear()} Academia Esporte e Ação.
            </div>
        </footer>
    );
}