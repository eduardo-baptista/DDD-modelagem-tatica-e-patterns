import type { Address } from "../value-object/address";

export class Customer {
	private _id: string;
	private _name: string;
	private _address!: Address;
	private _active = false;
	private _rewardPoints = 0;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
	}

	get address(): Address {
		return this._address;
	}

	set address(address: Address) {
		this._address = address;
		this._address.validate();
	}

	validate() {
		// is possible to add business rules here
		if (!this._name) throw new Error("Name is required");
		if (!this._id) throw new Error("Id is required");
	}

	addRewardPoints(points: number) {
		this._rewardPoints += points;
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	activate() {
		if (!this._address)
			throw new Error("Address is mandatory to activate customer");

		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	isActive() {
		return this._active;
	}
}
