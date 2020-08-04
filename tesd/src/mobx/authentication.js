import { observable, action } from 'mobx';
import firebase from './../services/firebase';

export class Auth {
	@observable
	infor = {
		displayName: null,
		email: null,
		emailVerified: null,
		photoURL: null,
		isAnonymous: null,
		uid: 'loading',
		providerData: null
	};

	@observable pending = true;

	@action
	setPending(bool) {
		this.pending = bool;
	}

	@action
	signup(email, address) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, address)
			.then(function() {
				alert('Dang ky thanh cong');
			})
			.catch(function(error) {
				var errorMessage = error.message;
				alert(`Danng ky khong thanh cong: ${errorMessage} `);
			});
	}

	@action
	LogIn(email, address) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, address)
			.then(function() {
				alert('Chao mung');
			})
			.catch(function(error) {
				var errorMessage = error.message;
				alert('Chua dang nhap duoc' + ':' + errorMessage);
			});
	}

	@action
	signOut() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				alert('Tam biet');
			})
			.catch(function(error) {
				alert(`Sign Out that bai ${error.message}`);
			});
	}

	@action
	statusLogin() {
		this.pending = false;
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.infor = {
					displayName: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					photoURL: user.photoURL,
					isAnonymous: user.isAnonymous,
					uid: user.uid,
					providerData: user.providerData
				};
			} else {
				this.infor = {
					displayName: null,
					email: null,
					emailVerified: null,
					photoURL: null,
					isAnonymous: null,
					uid: null,
					poviderData: null
				};
			}
		});
	}
}
