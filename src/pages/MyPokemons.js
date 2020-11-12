import React from 'react';
import { connect } from 'react-redux';
import PokemonCardSmall from '../components/PokemonCardSmall';
import MyPokemonList from '../components/MyPokemonList';

const MyPokemon = (props) => {
    const {myPokemons} = props;

    console.log(myPokemons);
    return (
        <div>
            <div className="mb-5 font-bold tracking-wider text-2xl text-center">
                My Pokemons
            </div>
            {
                myPokemons.length ? 
                    <MyPokemonList pokemons={myPokemons} /> :
                    (
                        <div>
                            No Pokemon Owned
                        </div>
                    )
            }
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