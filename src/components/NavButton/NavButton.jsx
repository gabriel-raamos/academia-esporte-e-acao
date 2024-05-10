import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function NavButton({link, title}) {
    return (

        <div className="flex justify-center items-center h-2/3 w-2/3" >
            <Link to={`${link}`}>
                <button className="text-red-700 text-sm md:text-xl py-2 md:py-5 px-8 mt-7 md:mt-0 rounded-full font-bold transition duration-500 hover:bg-red-700 hover:text-white" >
                    {title}
                </button>
            </Link>

        </div>

    )
}

NavButton.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string
}

export default NavButton