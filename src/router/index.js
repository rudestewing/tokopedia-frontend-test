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
        <div className="max-w-screen-md mx-auto min-h-full">
            <BrowserRouter >
                <div>
                    <ul className="flex justify-center bg-blue-500">
                        <li >
                            <Link to="/" className="block bg-blue-700 hover:bg-indigo-800 text-white font-semibold tracking-wider px-5 py-2 "> Home </Link>
                        </li>
                        <li >
                            <Link to="/my-pokemons" className="block bg-blue-700 hover:bg-indigo-800 text-white font-semibold tracking-wider px-5 py-2 "> My Pokemon </Link>
                        </li>
                    </ul>
                </div>
                <div className="py-10">
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
            </BrowserRouter>
        </div>
    )
}