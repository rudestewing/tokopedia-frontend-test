import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import http from '../utils/http';

const MyPokemonDetail = (props) => {
    const {
        match, 
        myPokemons,
        // activePokemon,
        // setActivePokemon
    } = props;

    const {id} = match.params;

    const [nickName, setNickName] = useState('');
    const [pokemon, setPokemon] = useState(null);

    async function getPokemonData() {

    }
    
    function getMyPokemonData() {
        let myPokemon = myPokemons.find((pokemon) => {
            return pokemon.id == id;
        });
        
        if(!myPokemon) {
            return props.history.push('/');
        }

        console.log(myPokemon);

        // setActivePokemon({
        //     pokemon: {}
        // });

        // try {
        //     const response = await http.get(`/pokemon/${id}`);

        //     let payload = {
        //         pokemon: response.data
        //     };

        //     setActivePokemon(payload);
        // } catch (error) {
        //     console.log(error);
        //     setActivePokemon({pokemon: {}});
        // }
    }
    
    useEffect(() => {
        getMyPokemonData();
    }, []);

    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 lg:w-4/12">
                Avatar pokemon
            </div>
            <div className="w-full md:w-2/3 lg:w-8/12">
                Detail pokemon
            </div>
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
        setActivePokemon: (payload) => dispatch({type: 'activePokemon/set', payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonDetail);