import { describe, expect, it, spyOn } from "bun:test";
import { EventDispatcher } from "./event-dispatcher";
import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";

describe("Domain events tests", () => {
	it("should register an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const EventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", EventHandler);

		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toBeDefined();
		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toHaveLength(1);
		expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toContain(
			EventHandler,
		);
	});

	it("should unregister an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const EventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", EventHandler);

		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toHaveLength(1);

		eventDispatcher.unregister("ProductCreatedEvent", EventHandler);

		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toHaveLength(0);
	});

	it("should unregister all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const EventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", EventHandler);

		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toHaveLength(1);

		eventDispatcher.unregisterAll();

		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toHaveLength(0);
	});

	it("should notify all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const EventHandler = new SendEmailWhenProductIsCreatedHandler();
		const spyEventHandler = spyOn(EventHandler, "handle");

		eventDispatcher.register("ProductCreatedEvent", EventHandler);

		expect(
			eventDispatcher.getEventHandlers("ProductCreatedEvent"),
		).toHaveLength(1);

		const productCreatedEvent = new ProductCreatedEvent({
			id: "1",
			name: "Product",
			price: 100,
		});

		eventDispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
});
