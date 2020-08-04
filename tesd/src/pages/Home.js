import React, { useEffect } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';

function useStores() {
	return React.useContext(MobXProviderContext);
}

function Home() {
	const { store } = useStores();
	const history = useHistory();

	const editlocation = (key) => {
		history.replace(`/edit/${key}`);
	};

	useEffect(() => {
		store.stateaddress.fetchlist();
	}, []);

	var renderlist = store.stateaddress.list.map((element) => {
		console.log(element);
		return (
			<tr key={element.key}>
				<td>{element.street}</td>
				<td>{element.ward}</td>
				<td>{element.district}</td>
				<td>{element.city}</td>
				<td>{element.country}</td>
				<td>
					<img alt='title' className='table_home_image' src={element.image} />
				</td>
				<td>
					{store.auth.infor.uid === element.streams_id ? (
						<span>
							<span className='btn-editdel' onClick={() => editlocation(element.key)}>
								Edit
							</span>
							<span className='btn-editdel'>Delete</span>
						</span>
					) : null}
				</td>
			</tr>
		);
	});

	return (
		<div className='home-container'>
			<div className='home-layout-table'>
				<table className='home-table'>
					<thead>
						<tr>
							<th>Street</th>
							<th>Ward</th>
							<th>District</th>
							<th>City</th>
							<th>Country</th>
							<th>Image</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{renderlist}</tbody>
				</table>
				<div className='task-control'>
					<Link className='btn btn-new' to='/news'>
						Add
					</Link>
					<a onClick={store.auth.signOut} className='btn btn-logout' href=' #'>
						Log Out
					</a>
				</div>
			</div>
		</div>
	);
}

export default observer(Home);
