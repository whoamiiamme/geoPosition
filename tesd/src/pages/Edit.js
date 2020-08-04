import React, { useState, useEffect } from 'react';
import { putDataBase } from './../services/database';
import { pushStorage } from './../services/storage';
import { useHistory } from 'react-router-dom';
import { getDataBase } from './../services/database';

function Edit(props) {
	const ref = `/list/${props.match.params.id}`;
	useEffect(() => {
		getDataBase({ ref }).once('value', (snapshot) => {
			const element = snapshot.val();
			if (element) {
				setloaction(element);
			}
		});
	}, []);
	const [ loaction, setloaction ] = useState({
		street: props.street,
		ward: props.ward,
		district: props.district,
		city: props.city,
		country: props.country,
		image: props.image
	});
	console.log(loaction);
	const  history  = useHistory();

	const onInputInfination = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		setloaction({
			...loaction,
			[name]: value
		});
	};

	const pushData = () => {
		const data = { ...loaction };
		putDataBase({ ref: `/${ref}`, data: data })
			.then(() => {
				alert('Da xong');
				setloaction({
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
		setloaction({ ...loaction, image: URL_imgage });
	};

	const goBack = () => {
		history.replace('/');
	};

	return (
		<div className='home-container'>
			<form>
				<div>
					<label className='infination-address'>Street</label>
					<input
						name='street'
						onChange={onInputInfination}
						value={loaction.street}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div>
					<label className='infination-address'>Ward</label>
					<input
						name='ward'
						onChange={onInputInfination}
						value={loaction.ward}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div>
					<label className='infination-address'>district</label>
					<input
						name='district'
						onChange={onInputInfination}
						value={loaction.district}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div>
					<label className='infination-address'>city</label>
					<input
						name='city'
						onChange={onInputInfination}
						value={loaction.city}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div>
					<label className='infination-address'>country</label>
					<input
						name='country'
						onChange={onInputInfination}
						value={loaction.country}
						type='text'
						className='infination-address__input'
					/>
				</div>
				<div>
					<label className='infination-address'>Image</label>
					<input onChange={uploadImage} id='image' type='file' className='infination-address__input' />
				</div>

				<div className='task-control'>
					<div onClick={pushData} type='button' className='btn btn-new'>
						Edit
					</div>
					<div onClick={goBack} className='btn btn-new'>
						Back
					</div>
				</div>
			</form>
		</div>
	);
}

export default Edit;
