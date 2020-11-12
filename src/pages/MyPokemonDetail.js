import React from 'react';

const MyPokemonDetail = (props) => {
    const {id} = props.match.params;

    return (
        <div>
            my pokemon detail {id}        
        </div>
    )
}

export default MyPokemonDetail;