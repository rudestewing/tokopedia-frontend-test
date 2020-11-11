import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import http from '../utils/http';
import PokemonList from '../components/PokemonList';

const Home = (props) => {
    const {
        wildPokemon,
        setPokemons,
        setPageNext,
        setPagePrevious,
        pageReset
    } = props;

    const [loading, setLoading] = useState(false);

    async function getPokemonData(pokemon) {
        try {
            const response = await http.get(`/pokemon/${pokemon.name}`);
            return response.data;

        } catch (error) {
            console.log('error getting pokemon data :(', error);

            return {
                ...pokemon
            };
        }
    }
    
    async function fetchWildPokemons() {
        setLoading(true);

        try {
            const response = await http.get('/pokemon', {
                params: {
                    offset: wildPokemon.offset,
                    limit: wildPokemon.limit,
                }
            });

            const {results} = response.data;

            if(results.length) {
                Promise.all(
                    results.map((pokemon) => {
                        return getPokemonData(pokemon);
                    })
                )
                .then((pokemons) => {
                    let payload = {
                        pokemons
                    }
                    setPokemons(payload);
                })
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        return () => {

        }
    }, []);

    useEffect(() => {
        setPokemons({
            pokemons: []
        });
        
        fetchWildPokemons();

        return () => {
            
        }
    }, [wildPokemon.offset]);

    return (
        <div>
            <div>
                <PokemonList pokemons={wildPokemon.pokemons} />
            </div>
            <div>
                <ul className="flex justify-center">
                    <li className={['block mx-3 py-2 px-4 bg-blue-500 text-white', {
                        
                    }]}>
                        <span onClick={setPagePrevious}> Prev. Page </span>
                    </li>
                    <li className={['block mx-3 py-2 px-4 bg-yellow-500 text-gray-800', {
                        
                    }]}>
                        <span onClick={() => pageReset()}> Reset Page </span>
                    </li>
                    <li className={['block mx-3 py-2 px-4 bg-blue-500 text-white', {
                        
                    }]}>
                        <span onClick={setPageNext}> Next Page </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        wildPokemon: state.wildPokemon,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPokemons: (payload) => dispatch({type: 'wildPokemon/setPokemons', payload}),
        setPageNext: () => dispatch({type: 'wildPokemon/setPageNext'}),
        setPagePrevious: () => dispatch({type: 'wildPokemon/setPagePrevious'}),
        pageReset: () => dispatch({type: 'wildPokemon/pageReset'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);