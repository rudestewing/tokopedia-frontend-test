import {lazy} from 'react';

const routes = [
    {
        path: '/',
        exact: true,
        Component: lazy(() => import('../pages/Home'))
    },
    {
        path: '/pokemon-detail/:id',
        exact: true,
        Component: lazy(() => import('../pages/PokemonDetail'))
    },
    {
        path: '/my-pokemons',
        exact: true,
        Component: lazy(() => import('../pages/MyPokemons'))
    },
    {
        path: '/my-pokemons/:id',
        exact: true,
        Component: lazy(() => import('../pages/MyPokemonDetail'))
    },
];

export default routes;