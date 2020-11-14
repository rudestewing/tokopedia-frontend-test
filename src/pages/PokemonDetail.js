import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import http from '../utils/http';
import TypeBadge from '../components/TypeBadge';
import {Link} from 'react-router-dom';

const PokemonDetail = (props) => {
    const [attempt, setAttempt] = useState(0);

    const {
        match, 
        activePokemon, 
        setActivePokemon,
        myPokemons,
        myPokemonAdded
    } = props;

    const {id} = match.params;
    const [loading, setLoading] = useState(false);

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

    function catchSuccess() {
        alert('Gotcha!!');

        const {id: real_id, sprites, name} = activePokemon;
        const catchTime = new Date().getTime();

        let _myPokemon = {
            id:  Math.random().toString(36).substring(7) + String(catchTime),
            real_id,
            name,
            sprites: {
                front_default: sprites.front_default,
                back_default: sprites.back_default,
            },
            nick_name: null,
            is_nick_name_set: false,
            catch_time: catchTime,
            attempt,
        };

        myPokemonAdded({
            pokemon: _myPokemon
        });

        props.history.push(`/my-pokemons/${_myPokemon.id}`);
    }

    function catchFailed() {
        alert(`${activePokemon.name} run`);
        // props.history.push("/");
    }

    async function catchPokemon() {
        setAttempt(attempt + 1);
        let rate = 50; //max 100;
        let isSuccess;

        if(loading) {
           return false; 
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            let randomNumber = Math.random() // random 0 - 1

            if(randomNumber < rate/100) {
                isSuccess = true;
            }

            if(isSuccess) {
                catchSuccess();
            } else {
                catchFailed();
            }
        }, 1000);
    }

    function isExistsPokemon() {
        let existsPokemon = myPokemons.find((pokemon) => {
            return pokemon.id == id;
        });
        return existsPokemon ? true : false;
    }

    useEffect(() => {
        getPokemonData();

        return () => {

        }
    }, []);
    
    return (
        <div>
            <div className="text-center">
                <Link to="/" className="text-blue-600 underline"> Back to Home</Link>
            </div>
            {
                activePokemon.sprites ?
                    (
                        <div className="flex justify-center items-center">
                            <div className=" w-64 h-64 mx-auto p-5">
                                <img src={activePokemon.sprites.front_default} alt="" className="w-full h-auto"/>
                            </div>
                        </div>
                    ) :
                    ('')
            }
            {
                activePokemon.name ?
                    (
                        <div className="py-5 font-bold tracking-wider text-2xl text-center">
                            {activePokemon.name}
                        </div>
                    ) : 
                    ('')
            }
            {
                activePokemon.types ?
                    (
                        <div className="flex flex-wrap justify-center">
                            {
                                activePokemon.types.map((type, typeIndex) => {
                                    return <TypeBadge type={type} key={typeIndex} />
                                })
                            }
                        </div>
                    ) :
                    ('')
            }
            {
                activePokemon.id ?
                    (
                        <div className="text-center my-10">
                            <button 
                                className={`
                                    bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full outline-none focus:outline-none
                                    ${loading ? 'opacity-25' : 'opacity-100'}
                                `}
                                onClick={catchPokemon}
                                > 
                                    {
                                        loading ? 
                                            `Calculating` :
                                            `Catch This Pokemon ${attempt > 0 ? 'Again' : ''}`
                                    } 
                            </button>
                            {
                                isExistsPokemon() == true ? 
                                    (
                                        <div>
                                            you aleady have this pokemon
                                        </div>
                                    ) :
                                    ('')
                            }
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
        setActivePokemon: (payload) => dispatch({type: 'activePokemon/set', payload}),
        myPokemonAdded: (payload) => dispatch({type: 'myPokemons/added', payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);