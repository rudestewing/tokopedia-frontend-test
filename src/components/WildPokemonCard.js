import React, { useState } from 'react';

const PokemonCardSmall = (props) => {
    const {
        sprites,
        name,
        ownedCount
    } = props;

    const [avatar, setAvatar] = useState('');

    function setAvatarToFront() {
        if(sprites) {
            setAvatar(sprites.front_default);
        }
    }

    function setAvatarToBack() {
        if(sprites) {
            setAvatar(sprites.back_default);
        }
    }

    useState(() => {
        if(sprites) {
            setAvatar(sprites.front_default);
        }
    }, []);

    return (
        <div className="bg-white rounded-md shadow-md overflow-hidden border relative" onMouseOver={setAvatarToBack} onMouseLeave={setAvatarToFront}>
            <div className={`w-8 h-8 flex justify-center items-center ${ownedCount > 0 ? 'bg-blue-400' : ''}`} style={{
                top: 0,
                right: 0
            }}>
                <span>
                    {ownedCount}
                </span>
            </div>
            <div className="py-3">
                <img src={avatar} alt="" className="w-24 mx-auto"/>
            </div>
            <div className="block tracking-wider font-semibold text-center py-2 mb-3">
                {name}
            </div>
            
        </div>
    )
}

export default PokemonCardSmall;