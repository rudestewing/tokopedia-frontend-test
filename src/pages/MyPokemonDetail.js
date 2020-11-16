import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import http from '../utils/http';
import {Link} from 'react-router-dom';
import TypeBadge from '../components/TypeBadge';

const MyPokemonDetail = (props) => {
    const {
        match, 
        myPokemons,
        activePokemon,
        setActivePokemon,
        myPokemonsPokemonUpdated,
        myPokemonsReleased,
    } = props;

    const {id} = match.params;

    const [nickName, setNickName] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const [errors, setErrors] = useState({});

    function handleRelease() {
        if(!window.confirm(`Are you sure want to release ${pokemon.nick_name || pokemon.name}.`)) {
            return;
        }

        myPokemonsReleased({
            id
        });

        props.history.push('/my-pokemons');
    }

    function handleSetNickName() {
        if(!window.confirm(`Are you sure want to set this pokemon nick name to ${nickName} ?. You cannot rename it.`)) {
            return;
        }

        setErrors({
            ...errors,
            nick_name: null
        });
        
        let existsPokemonWithSameNickName = myPokemons.find((myPokemonItem) => {
            return String(myPokemonItem.nick_name).toLowerCase() === String(nickName).toLocaleLowerCase();
        });

        if(existsPokemonWithSameNickName) {
            setErrors({
                ...errors,
                nick_name: [
                    `Can't use ${nickName} Nickname Already Exists `
                ]
            })
            return;
        }

        let myUpdatedPokemon = {
            ...pokemon,
            nick_name: nickName,
        }

        setPokemon(myUpdatedPokemon);

        myPokemonsPokemonUpdated({
            id,
            pokemon: myUpdatedPokemon            
        });
    }

    async function getPokemonData() {
        try {
            setActivePokemon({
                pokemon: {}
            });

            let myPokemon = myPokemons.find((pokemon) => {
                return String(pokemon.id) === String(id);
            });
            
            if(!myPokemon) {
                return props.history.push('/');
            }

            setPokemon(myPokemon);

            const response = await http.get(`/pokemon/${myPokemon.real_id}`);

            console.log(response.data);

            setActivePokemon({
                pokemon: response.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(() => {
        getPokemonData();

        return () => {}
    }, []);

    return (
        <Fragment>
            <div className="text-center">
                <Link to="/my-pokemons" className="text-blue-600 underline"> Back to Home </Link>
            </div>
            {
                pokemon ? 
                    (
                        <div>
                            <h3 className="font-bold text-3xl mb-2 text-center">
                                {pokemon.name}
                            </h3>
                            {
                                !pokemon.nick_name || 
                                (
                                    <div className="text-gray-600 text-center mb-5">
                                        {pokemon.nick_name}
                                    </div>
                                )
                            }
                            <div className="mb-5 text-center">
                                <div className="bg-white rounded-md w-40 h-40 border mx-auto">
                                    <img src={pokemon.sprites.front_default} alt="" className="w-full"/>
                                </div>
                            </div>
                            {
                                !pokemon.nick_name ?
                                    (
                                        <div className="mb-5 mx-auto w-64 text-center">
                                            <div className="mb-3">
                                                <label htmlFor="" className="text-center block"> Give Nick Name to this pokemon </label>
                                                <input type="text" className="bg-white border-2 focus:border-blue-700 rounded-lg font-semibold outline-none px-3 py-2 block w-full" placeholder={pokemon.name} onChange={((e) => setNickName(e.target.value))} value={nickName} />
                                                {
                                                    errors.nick_name ?
                                                        (
                                                            <span className="text-red-700">
                                                                {errors.nick_name[0]}
                                                            </span>
                                                        ) : 
                                                        ('')
                                                }
                                            </div>
                                            <div>
                                                <button onClick={handleSetNickName} className="bg-blue-600 text-white px-3 py-2 rounded-lg">
                                                    Save Nick Name
                                                </button>
                                            </div>
                                        </div>
                                    ) : 
                                    ('')
                            }
                        </div>
                    ) : 
                    (
                        ''
                    )
            }
            <div className="mb-5 text-center">
                <button onClick={handleRelease} className="bg-red-600 hover:bg-red-800 text-white px-5 py-2 rounded-full outline-none focus:outline-none">Release Pokemon</button>
            </div>

            <div className="mb-5 bg-white rounded-lg p-5">
                {
                    !activePokemon.types ||
                        (
                            <div className="mb-5">
                                <h3 className="mb-2 font-bold">
                                    Types
                                </h3>
                                <div className="flex flex-wrap">
                                    {
                                        activePokemon.types.map((type, typeIndex) => {
                                            return <TypeBadge type={type} key={typeIndex} />
                                        })
                                    }
                                </div>
                            </div>
                        )
                }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        !activePokemon.stats || 
                            (
                                <div className="mb-5">
                                    <h3 className="mb-2 font-bold">
                                        Stats
                                    </h3>
                                    <table width="100%">
                                        <tbody>
                                            {
                                                activePokemon.stats.map((stat, statIndex) => {
                                                    return (
                                                        <tr key={statIndex}>
                                                            <td> {stat.stat.name} </td>
                                                            <td>:</td>
                                                            <td> {stat.base_stat} </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                    {
                        !activePokemon.abilities || 
                        (
                            <div className="mb-5">
                                <h3 className="mb-2 font-bold">
                                    Abilities
                                </h3>
                                <table width="100%">
                                    <tbody>
                                        {
                                            activePokemon.abilities.map((ability, abilityIndex) => {
                                                return (
                                                    <tr key={abilityIndex}>
                                                        <td>{ability.ability.name}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="mb-5 text-center">
                <Link to="/my-pokemons" className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full outline-none focus:outline-none"> Go to my pokemon List </Link>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        activePokemon: state.activePokemon,
        myPokemons: state.myPokemons,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActivePokemon: (payload) => dispatch({type: 'activePokemon/set', payload}),
        myPokemonsPokemonUpdated: (payload) => dispatch({type: 'myPokemons/pokemonUpdated', payload}),
        myPokemonsReleased: (payload) => dispatch({type: 'myPokemons/released', payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonDetail);