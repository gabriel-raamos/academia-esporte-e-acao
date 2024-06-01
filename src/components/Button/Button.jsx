import PropTypes from 'prop-types'

function Button({text}) {
    return (

        <section>
            <button 
                type="submit" 
                className="p-5 px-10 bg-red-700 m-3 text-white text-xl rounded-xl transition hover:bg-red-500 hover:-translate-y-3 duration-500" 
            >
                {text}
            </button>
        </section>

    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}

export default Button