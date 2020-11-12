import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import http from '../utils/http';

const MyPokemonDetail = (props) => {
    const {
        match, 
        activePokemon,
        setActivePokemon,
    } = props;

    const {id} = match.params;


    const [nickName, setNickName] = useState('');

    async function getPokemonData() {
        setActivePokemon({
            pokemon: {}
        });

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
    
    useEffect(() => {
        getPokemonData();
    }, []);

    return (
        <div>
            <div>
                
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