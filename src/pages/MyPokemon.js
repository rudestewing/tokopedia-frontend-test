import React from 'react';
import { connect } from 'react-redux';

const MyPokemon = () => {
    return (
        <div>
            <div>
                My Pokemon List ❤️
            </div>
            <div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myPokemons: state.myPokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        released: (payload) => dispatch({type: 'myPokemons/released'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);