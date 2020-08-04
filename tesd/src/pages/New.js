import React, { useState, useContext } from 'react';
import { pushDataBase } from './../services/database';
import { pushStorage } from './../services/storage';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './../tools/Auth';
import { geoPosition, geoPositionText} from './../services/location';

function New() {
	const history = useHistory();
	const [ infination, setInfination ] = useState({
		street: '',
		ward: '',
		district: '',
		city: '',
		country: '',
		image: ''
	});
	const { currentUser } = useContext(AuthContext);

	const onInputInfination = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		setInfination({
			...infination,
			[name]: value
		});
	};

	const pushData = () => {
		const streams_id = currentUser.uid;
		const data = { ...infination, streams_id: streams_id };
		pushDataBase({ ref: `/list/`, data: data })
			.then(() => {
				alert('Da xong');
				setInfination({
					street: '',
					ward: '',
					district: '',
					city: '',
					country: '',
					image: ''
				});
			})
			.catch((error) => {
				alert(error);
			});
	};

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		const URL_imgage = await pushStorage({ ref: `/image/${file.name}`, file });
		setInfination({ ...infination, image: URL_imgage });
	};

	const goBackHome = () => {
		history.replace('/');
	};

	const onPressGeoLoc = async() => {
		const position = await geoPosition();
		const positionText = await geoPositionText({ longitude: position.longitude, latitude: position.latitude });
	
		setInfination({
		  city: positionText.city,
		  country: positionText.country,
		  district: positionText.district,
		  street: positionText.street_name,
		});
	  }

	return (
		<div className='home-container'>
			<form className='new_form'>
				<div className='new_form_cell'>
					<label className='infination-address'>Street</label>
					<input
						name='street'
						onChange={onInputInfination}
						value={infination.street}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div className='new_form_cell'>
					<label className='infination-address'>Ward</label>
					<input
						name='ward'
						onChange={onInputInfination}
						value={infination.ward}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div className='new_form_cell'>
					<label className='infination-address'>district</label>
					<input
						name='district'
						onChange={onInputInfination}
						value={infination.district}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div className='new_form_cell'>
					<label className='infination-address'>city</label>
					<input
						name='city'
						onChange={onInputInfination}
						value={infination.city}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div className='new_form_cell'>
					<label className='infination-address'>country</label>
					<input
						name='country'
						onChange={onInputInfination}
						value={infination.country}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div className='new_form_cell'>
					<label className='infination-address'>Image</label>
					<input onChange={uploadImage} type='file' className='infination-address__input' />
				</div>
			</form>

			<div className='task-control'>
				<div onClick={pushData} type='button' className='btn btn-new'>
					Add
				</div>
				<div onClick={goBackHome} type='button' className='btn btn-new'>
					Back
				</div>
				<div onClick={onPressGeoLoc} type='button' className='btn btn-new'>
					Vi Tri Hien Tai
				</div>
			</div>
		</div>
	);
}

export default New;
