import { stateAddress } from './stateAddress';
import { Auth } from './authentication';

export class RootMobx {
	constructor() {
		this.auth = new Auth(this);
		this.stateaddress = new stateAddress(this);
	}
}
