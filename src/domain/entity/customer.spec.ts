import { describe, expect, it } from "bun:test";
import { Customer } from "./customer";
import { Address } from "./address";

describe("Customer unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => new Customer("", "Eduardo")).toThrow("Id is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => new Customer("123", "")).toThrow("Name is required");
	});

	it("should change name", () => {
		const customer = new Customer("123", "Name");
		customer.changeName("New Name");

		expect(customer.name).toBe("New Name");
	});

	it("should activate customer", () => {
		const customer = new Customer("123", "Name");
		const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
		customer.address = address;
		customer.activate();

		expect(customer.isActive()).toBe(true);
	});

	it("should throw error when address is undefined when activate a customer", () => {
		const customer = new Customer("123", "Name");
		expect(() => customer.activate()).toThrow(
			"Address is mandatory to activate customer",
		);
	});

	it("should deactivate customer", () => {
		const customer = new Customer("123", "Name");
		customer.deactivate();

		expect(customer.isActive()).toBe(false);
	});

	it("should add reward points", () => {
		const customer = new Customer("123", "Name");
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);

		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(20);

		expect(customer.rewardPoints).toBe(30);
	});
});
