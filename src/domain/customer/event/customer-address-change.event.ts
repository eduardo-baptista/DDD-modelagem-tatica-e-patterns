import type { EventInterface } from "../../@shared/event/event.interface";

interface CustomerAddressChangeEventPayload {
	id: string;
	name: string;
	address: {
		street: string;
		number: number;
		zip: string;
		city: string;
	};
}

export class CustomerAddressChangeEvent
	implements EventInterface<CustomerAddressChangeEventPayload>
{
	dateTimeOccurred: Date;
	eventData: CustomerAddressChangeEventPayload;

	constructor(
		id: string,
		name: string,
		address: {
			street: string;
			number: number;
			zip: string;
			city: string;
		},
	) {
		this.dateTimeOccurred = new Date();
		this.eventData = {
			id,
			name,
			address,
		};
	}
}
