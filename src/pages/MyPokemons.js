import React from 'react';
import { connect } from 'react-redux';
import PokemonCardSmall from '../components/PokemonCardSmall';

const MyPokemon = (props) => {
    const {myPokemons} = props;

    console.log(myPokemons);
    return (
        <div>
            <div className="mb-5 font-bold tracking-wider text-2xl text-center">
                My Pokemon List
            </div>
            <div className="grid grid-cols-4 gap-3">
                {
                    myPokemons.map((pokemon, index) => {
                        console.log(pokemon);
                        return (
                            <div key={index}>
                                {pokemon.id}
                            </div>
                        )
                    })
                }
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