import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react';
import { AuthContext } from './../tools/Auth';
import firebase from './../services/firebase';
import { Redirect } from 'react-router-dom';

function Login({ history }) {
	const [ email, setemail ] = useState('');
	const [ password, setpassword ] = useState('');

	const LogIn = () => {
		try {
			firebase.auth().signInWithEmailAndPassword(email, password);
			history.push('/');
		} catch (error) {
			alert(error);
		}
	};

	const Signup = () => {
		try {
			firebase.auth().createUserWithEmailAndPassword(email, password);
			history.push('/');
		} catch (error) {
			alert(error);
		}
	};

	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		return <Redirect to='/' />;
	}

	return (
		<div className='login-body'>
			<div className='login-contaier'>
				<form className='login-from'>
					<div>
						<label className='login-label__infornation'>Email</label>
						<input
							onChange={(e) => setemail(e.target.value)}
							value={email}
							type='email'
							className='login-container__input'
						/>
					</div>

					<div className='form-group'>
						<label className='login-label__infornation'>Password</label>
						<input
							onChange={(e) => setpassword(e.target.value)}
							value={password}
							type='password'
							className='login-container__input'
						/>
					</div>

					<div onClick={LogIn} type='button' className='btn btn-login'>
						Log in
					</div>
					<div id='login' onClick={Signup} type='button' className='btn btn-sign'>
						Sign Up
					</div>
				</form>
			</div>
		</div>
	);
}
export default observer(Login);
