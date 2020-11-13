import React from 'react';

const HeaderSticky = (props) => {
    return (
        <div className="fixed  h-20 w-full bg-white flex justify-center items-center inset-0 shadow-md z-50 max-w-screen-md mx-auto">
            <a href="/" className="h-10 w-10 ">
                <img src="/pokeball-logo.png" alt=""/>
            </a>
        </div>
    )
}

export default HeaderSticky;