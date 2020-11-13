import { Suspense } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

import HeaderSticky from '../components/HeaderSticky';
import NavigationSticky from '../components/NavigationSticky';

import routes from './routes';

export default () => {
    return (
        <div className="max-w-screen-md mx-auto bg-gray-200 min-h-screen">
            <BrowserRouter >
                <HeaderSticky />
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
                <NavigationSticky />
            </BrowserRouter>
        </div>
    )
}