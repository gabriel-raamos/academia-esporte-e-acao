import PropTypes from 'prop-types'

function ContactInput({placeholder, type}) {

    return (
        <input 
            type={type}
            placeholder={placeholder} 
            className="text-blue-700 w-full p-2 my-4 placeholder-blue-700 rounded-lg" 
        />
    )

}

ContactInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default ContactInput