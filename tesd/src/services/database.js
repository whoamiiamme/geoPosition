import firebase from './firebase';

export function getDataBase({ ref }) {
	return firebase.database().ref(ref);
}

export function deleteDataBase({ ref }) {
	return firebase.database().ref(ref).remove();
}

export function putDataBase({ ref, data }) {
	return firebase.database().ref(ref).set(data);
}

export function pushDataBase({ ref, data }) {
	return firebase.database().ref(ref).push(data);
}
