export default function Mapa() {

    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.324448974533!2d-45.186101023774434!3d-22.79043873372502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ccc5cb948fa9db%3A0xbb293f82eda70000!2sAcademia%20Esporte%20e%20A%C3%A7%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1715813701148!5m2!1spt-BR!2sbr"
            width="900"
            height="450"
            allowFullScreen=""
            style={{borderRadius: '25px'}}
            className="custom-border md:h-80 largura-70vw md:largura-50vw mb-5 md:mb-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe>
    )

}