import PropTypes from 'prop-types'

function NavButton(props) {
    return (

        <div className="flex justify-center items-center h-2/3 w-2/3" >
            <button className="text-red-700 text-sm md:text-xl py-2 md:py-5 px-8 mt-5 md:mt-0 rounded-full font-bold transition duration-500 hover:bg-red-700 hover:text-white" >
                {props.title}
            </button>

        </div>

    )
}

NavButton.propTypes = {
    title: PropTypes.string
}

export default NavButton