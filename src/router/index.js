import { Suspense } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import routes from './routes';

export default () => {
    return (
        <div className="max-w-screen-md mx-auto bg-gray-200 min-h-screen">
            <BrowserRouter >
                <div className="fixed  h-20 w-full bg-white flex justify-center items-center inset-0 shadow-md z-50 max-w-screen-md mx-auto">
                    <a href="/" className="h-10 w-10 ">
                        <img src="/pokeball-logo.png" alt=""/>
                    </a>
                </div>
                <div className="py-32 px-4">
                    <Switch>
                        <Suspense fallback={
                            <div>Loading...</div>
                        }>
                            {
                                routes.map(({path, Component}, routeIndex) => {
                                    return <Route 
                                        key={routeIndex} 
                                        exact 
                                        path={path}
                                        component={Component}
                                        />
                                })
                            }
                        </Suspense>
                    </Switch>
                </div>
                <div className="fixed max-w-screen-md mx-auto h-20  w-full bg-white z-50 border-gray-400" style={{bottom: 0}}>
                    <ul className="flex w-full h-full">
                        <li className="flex-1">
                            <Link to="/" className="block bg-indigo-500 hover:bg-indigo-800 text-white font-semibold tracking-wider px-5 py-2 h-full flex justify-center items-center "> Home </Link>
                        </li>
                        <li className="flex-1">
                            <Link to="/my-pokemons" className="block bg-indigo-500 hover:bg-indigo-800 text-white font-semibold tracking-wider px-5 py-2 h-full flex justify-center items-center "> My Pokemon </Link>
                        </li>
                    </ul>
                </div>
            </BrowserRouter>
        </div>
    )
}