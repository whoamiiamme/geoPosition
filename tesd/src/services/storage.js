import firebase from './firebase';

export function pushStorage({ ref, file }) {
	const storageRef = firebase.storage().ref(ref);
	var uploadTask = storageRef.put(file);
	// Listen for state changes, errors, and completion of the upload.
	return new Promise((resolve, reject) => {
		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
				alert('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused');
						break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
					default:
				}
			},
			function(error) {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case 'storage/unauthorized':
						console.log('User does not have permission to access the object');
						break;

					case 'storage/canceled':
						console.log('User canceled the upload');
						break;

					case 'storage/unknown':
						console.log('Unknown error occurred, inspect error.serverResponse');
						break;
					default:
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					resolve(downloadURL);
				});
			}
		);
	});
}
