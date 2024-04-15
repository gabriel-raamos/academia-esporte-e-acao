import PropTypes from 'prop-types'

function NavButton(props) {
    return (
        <button className="text-red-700 font-bold transition duration-500 hover:bg-red-700 hover:text-white text-xl" >
            {props.title}
        </button>
    )
}

NavButton.propTypes = {
    title: PropTypes.string
}

export default NavButton