import React from 'react';
import {Link} from 'react-router-dom';

const NavigationSticky = (props) => {
    return (
        <div className="fixed max-w-screen-md mx-auto h-20  w-full bg-white z-50 border-gray-400" style={{bottom: 0}}>
            <ul className="flex w-full h-full">
                <li className="flex-1">
                    <Link to="/" className="block bg-indigo-500 hover:bg-indigo-800 text-white font-semibold tracking-wider px-5 py-2 h-full flex justify-center items-center "> Home </Link>
                </li>
                <li className="flex-1">
                    <Link to="/my-pokemons" className="block bg-indigo-500 hover:bg-indigo-800 text-white font-semibold tracking-wider px-5 py-2 h-full flex justify-center items-center "> My Pokemon </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationSticky;