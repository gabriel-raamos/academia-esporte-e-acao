import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function NavButton({link, title}) {
    return (

        <div className="flex justify-center items-center h-2/3 w-2/3" >
            <Link to={`${link}`}>
                <button className="text-white text-sm md:text-xl p-2 mt-7 md:mt-0 rounded-3xl font-bold transition duration-500 hover:bg-blue-700 hover:text-white focus:bg-blue-700" >
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