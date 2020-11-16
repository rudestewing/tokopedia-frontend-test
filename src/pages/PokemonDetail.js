import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import http from '../utils/http';
import TypeBadge from '../components/TypeBadge';
import {Link} from 'react-router-dom';
import CatchAction from '../components/CatchAction';

const PokemonDetail = (props) => {
    const {
        match, 
        activePokemon, 
        setActivePokemon,
    } = props;

    const {id} = match.params;

    async function getPokemonData() {
        setActivePokemon({
            pokemon: {}
        });
        
        try {
            const response = await http.get(`/pokemon/${id}`);

            let payload = {
                pokemon: {
                    catch_rate_percentage: 50,
                    ...response.data
                }
            };

            setActivePokemon(payload);
        } catch (error) {
            console.log(error);
            setActivePokemon({pokemon: {}});
        }
    }

    function pokemonCatched(id) {
        props.history.push(`/my-pokemons/${id}`);
    }

    useEffect(() => {
        getPokemonData();
    }, []);
    
    return (
        <div>
            <div className="text-center">
                <Link to="/" className="text-blue-600 underline"> Back to Home</Link>
            </div>
            {
                !activePokemon.sprites ||
                    (
                        <div className="flex justify-center items-center">
                            <div className=" w-64 h-64 mx-auto p-5">
                                <img src={activePokemon.sprites.front_default} alt="" className="w-full h-auto"/>
                            </div>
                        </div>
                    )
            }
            {
                !activePokemon.name ||
                    (
                        <div className="py-5 font-bold tracking-wider text-2xl text-center">
                            {activePokemon.name}
                        </div>
                    )
            }
            {
                !activePokemon.types || 
                    (
                        <div className="flex flex-wrap justify-center">
                            {
                                activePokemon.types.map((type, typeIndex) => {
                                    return <TypeBadge type={type} key={typeIndex} />
                                })
                            }
                        </div>
                    )
            }
            {
                !activePokemon.id ||
                    (
                        <CatchAction pokemon={activePokemon} pokemonCatched={pokemonCatched} />
                    )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        activePokemon: state.activePokemon,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActivePokemon: (payload) => dispatch({type: 'activePokemon/set', payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);