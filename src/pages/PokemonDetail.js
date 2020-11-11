import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import http from '../utils/http';

const PokemonDetail = (props) => {
    const {
        match, 
        activePokemon, 
        setActivePokemon,
        myPokemons
    } = props;

    const {id} = match.params;

    async function getPokemonData() {
        try {
            const response = await http.get(`/pokemon/${id}`);

            let payload = {
                pokemon: response.data
            };

            setActivePokemon(payload);
        } catch (error) {
            console.log(error);
            setActivePokemon({pokemon: {}});
        }
    }

    async function catchPokemon() {

        // logic to catch here
    }

    function isExistsPokemon() {
        let existsPokemon = myPokemons.find((pokemon) => {
            return pokemon.id === id;
        });

        return existsPokemon ? true : false;
    }

    useEffect(() => {
        setActivePokemon({
            pokemon: {}
        });
        
        getPokemonData();

        return () => {

        }
    }, []);
    
    
    return (
        <div>
            <div>
                {activePokemon.name}
            </div>

            {
                isExistsPokemon() ? 
                    (
                        <div>
                            you aleady have this pokemon
                        </div>
                    ) :
                    ('')
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        activePokemon: state.activePokemon,
        myPokemons: state.myPokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActivePokemon: (payload) => dispatch({type: 'activePokemon/set', payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);