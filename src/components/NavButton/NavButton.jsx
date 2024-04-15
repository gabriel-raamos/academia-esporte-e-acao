import PropTypes from 'prop-types'

function NavButton(props) {
    return (

        <div className="flex justify-center items-center" >
            <button className="text-red-700 p-7 px-10 rounded-3xl font-bold transition duration-500 hover:bg-red-700 hover:text-white text-xl" >
                {props.title}
            </button>

        </div>

    )
}

NavButton.propTypes = {
    title: PropTypes.string
}

export default NavButton