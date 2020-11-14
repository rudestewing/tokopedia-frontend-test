import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import http from '../utils/http';
import PokemonList from '../components/PokemonList';

const Home = (props) => {
    const {
        wildPokemon,
        myPokemons,
        setPokemons,
        setPageNext,
        setPagePrevious,
        pageReset
    } = props;

    const [loading, setLoading] = useState(false);

    function ownedCount(pokemon) {
        return myPokemons.filter((myPokemon) => {
            return myPokemon.real_id === pokemon.id;
        }).length;
    }

    function pageNext() {

    }

    function pagePrevious() {

    }

    async function getPokemonData(pokemon) {
        try {
            const response = await http.get(`/pokemon/${pokemon.name}`);

            let _pokemon = response.data;
            let {id, name, sprites} = _pokemon;
            
            return {
                id,
                name,
                sprites,
                owned_count: ownedCount(_pokemon)
            };

        } catch (error) {
            console.log('error getting pokemon data :(', error);

            return {
                ...pokemon
            };
        }
    }
    
    async function fetchWildPokemons() {
        try {
            setLoading(true);
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
        setPokemons({
            pokemons: []
        });

        fetchWildPokemons();

        return () => {
            
        }
    }, [wildPokemon.offset]);

    return (
        <div>
            <PokemonList pokemons={wildPokemon.pokemons} />
            <ul className="flex justify-center w-full">
                <li >
                    <span className={['block cursor-pointer mx-3 py-2 px-4 bg-blue-500 hover:bg-blue-800 hover:text-white text-white', {
                        'opacity-50': loading,
                    }]} onClick={setPagePrevious}> Previous </span>
                </li>
                <li >
                    <span className={['block cursor-pointer mx-3 py-2 px-4 bg-yellow-500 hover:bg-yellow-700 hover:text-white text-gray-800', {
                        'opacity-50': loading,
                    }]} onClick={() => pageReset()}> Reset </span>
                </li>
                <li >
                    <span className={['block cursor-pointer mx-3 py-2 px-4 bg-blue-500 hover:bg-blue-800 hover:text-white text-white', {
                        'opacity-50': loading,
                    }]} onClick={setPageNext}> Next </span>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        wildPokemon: state.wildPokemon,
        myPokemons: state.myPokemons
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