import { observable, action } from 'mobx';
import { getDataBase } from './../services/database';

export class stateAddress {
	@observable list = [];

	@action
	fetchlist() {
		getDataBase({ ref: '/list' }).on('value', (snapshot) => {
			this.list = [];
			snapshot.forEach((element) => {
				this.list.push({
					key: element.key,
					street: element.val().street,
					ward: element.val().ward,
					district: element.val().district,
					city: element.val().city,
					country: element.val().country,
					streams_id: element.val().streams_id,
					image: element.val().image
				});
			});
		});
	}


}
