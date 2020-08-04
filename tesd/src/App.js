import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MobXProviderContext } from 'mobx-react';

import Login from './pages/Login';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import { AuthProvider } from './tools/Auth';
import PrivateRoute from './tools/PrivateRoute';

function useStore() {
	return useContext(MobXProviderContext);
}
function App() {
	const { store } = useStore();

	useEffect(() => {
		store.auth.statusLogin();
		store.auth.setPending(false);
	}, []);

	return (
		<AuthProvider>
			<Router>
				<Switch>
					<PrivateRoute path='/' exact={true} component={Home} />
					<PrivateRoute path='/news' component={New} />
					<PrivateRoute path='/edit/:id' component={Edit} />
					<Route path='/login' component={Login} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
