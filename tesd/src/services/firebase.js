import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
	apiKey: 'AIzaSyBScDBqf8mtDfYBD0HXL7ZP9EZEWgE9u7k',
	authDomain: 'addressinvietname.firebaseapp.com',
	databaseURL: 'https://addressinvietname.firebaseio.com',
	projectId: 'addressinvietname',
	storageBucket: 'addressinvietname.appspot.com',
	messagingSenderId: '538614822514',
	appId: '1:538614822514:web:e6023a4473112add64b4eb',
	measurementId: 'G-LX622CYQFH'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
