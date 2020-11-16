import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CatchButton = (props) => {
    const {
        pokemon,
        myPokemons,
        myPokemonsAdded,
        pokemonCatched
    } = props;

    const [attempt, setAttempt] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function catchSuccess() {
        const {id: real_id, sprites, name} = pokemon;
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

        myPokemonsAdded({
            pokemon: _myPokemon
        });

        alert(`GOTCHA!!  you caught ${_myPokemon.name}`);
        pokemonCatched(_myPokemon.id);
    }

    function catchFailed() {
        setErrors({
            catch: [
                `${pokemon.name} run, try again!`
            ]
        })
    }

    useEffect(() => {
        console.log(props);
    }, [])

    async function handleCatch() {
        setErrors({});
        
        setAttempt(attempt + 1);
        
        let rate = pokemon.catch_rate_percentage; //max 100;
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
        let existsPokemon = myPokemons.find((myPokemon) => {
            
            return String(myPokemon.real_id) === String(pokemon.id);
        });
        return existsPokemon ? true : false;
    }
    
    return (
            <div className="text-center my-10">
                {
                    !errors.catch ||
                        (
                            <div className="text-red-600 text-center mb-5">
                                {errors.catch[0]}
                            </div>
                        ) 
                }
                <div>
                    <button 
                        className={`
                            bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full outline-none focus:outline-none
                            ${loading ? 'opacity-25' : 'opacity-100'}
                        `}
                        onClick={() => handleCatch()}
                    >
                        {
                            loading ? 
                                `Calculating` :
                                `Catch This Pokemon ${attempt > 0 ? 'Again' : ''}`
                        } 
                    </button>
                </div>
                {
                    isExistsPokemon() === true ? 
                        (
                            <p>
                                you aleady have this pokemon
                            </p>
                        ) :
                        ('')
                }
            </div>
    )
}

CatchButton.propTypes = {
    pokemon: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        myPokemons: state.myPokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        myPokemonsAdded: (payload) => dispatch({type: 'myPokemons/added', payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatchButton);