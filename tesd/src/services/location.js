const GEO_LOCATION_API_KEY = GEO_LOCATION_API_KEY;

export function geoPosition() {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(function(position) {
			resolve({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				accuracy: position.coords.accuracy
			});
		});
	});
}

export function locationAdapter({ position }) {
	const { length } = position;
	let locState;

	switch (length) {
		case 4:
			locState = {
				country: position[3].long_name,
				city: position[2].long_name,
				district: position[1].long_name,
				ward: '',
				street_name: position[0].long_name
			};
			break;
		case 5:
			locState = {
				country: position[4].long_name,
				city: position[3].long_name,
				district: position[2].long_name,
				ward: '',
				street_name: `${position[0].long_name} ${position[1].long_name}`
			};
			break;
		default:
			break;
	}
	return locState;
}

export function geoPositionText({ latitude, longitude }) {
	return new Promise((resolve, reject) => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?&latlng=${latitude},${longitude}&key=${GEO_LOCATION_API_KEY}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					const position = result.results[0].address_components;
					resolve(locationAdapter({ position }));
				},
				(error) => {
					reject(error);
				}
			);
	});
}
