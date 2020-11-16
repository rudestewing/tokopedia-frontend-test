import React from 'react';

const TypeBadge = (props) => {
    const {type} = props;

    let availableTypes = [
        {
            name: "normal",
            bgClass: 'bg-gray-100',
        },
        {
            name: "fighting",
            bgClass: 'bg-gray-300',
        },
        {
            name: "flying",
            bgClass: 'bg-blue-300',
        },
        {
            name: "poison",
            bgClass: 'bg-indigo-700 text-white',
        },
        {
            name: "ground",
            bgClass: 'bg-gray-400',
        },
        {
            name: "rock",
            bgClass: 'bg-orange-500',
        },
        {
            name: "bug",
            bgClass: 'bg-green-200',
        },
        {
            name: "ghost",
            bgClass: 'bg-gray-700 text-white',
        },
        {
            name: "steel",
            bgClass: 'bg-gray-400',
        },
        {
            name: "fire",
            bgClass: 'bg-red-600 text-white',
        },
        {
            name: "water",
            bgClass: 'bg-blue-700 text-white',
        },
        {
            name: "grass",
            bgClass: 'bg-green-700 text-white',
        },
        {
            name: "electric",
            bgClass: 'bg-yellow-400',
        },
        {
            name: "psychic",
            bgClass: 'bg-purple-800 text-white',
        },
        {
            name: "ice",
            bgClass: 'bg-blue-200',
        },
        {
            name: "dragon",
            bgClass: 'bg-pink-700 text-white',
        },
        {
            name: "dark",
            bgClass: 'bg-gray-800 text-white',
        },
        {
            name: "fairy",
            bgClass: 'bg-yellow-200',
        },
        {
            name: "unknown",
            bgClass: 'bg-gray-900 text-white',
        },
        {
            name: "shadow",
            bgClass: 'bg-gray-400',
        }
    ];

    function activeType() {
        return availableTypes.find(item => {
            return String(item.name) === String(type.type.name);
        });
    }

    return (
        <div className={`rounded-full font-semibold  px-5 py-2 text-sm border shadow-md ${activeType().bgClass}`}>
            {type.type.name}
        </div>
    )
}


export default TypeBadge;