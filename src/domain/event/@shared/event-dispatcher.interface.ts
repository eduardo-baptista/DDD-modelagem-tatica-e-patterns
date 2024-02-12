import type { EventHandlerInterface } from "./event-handler.interface";
import type { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
	notify<T>(event: EventInterface<T>): void;
	register<T>(eventName: string, eventHandler: EventHandlerInterface<T>): void;
	unregister<T>(
		eventName: string,
		eventHandler: EventHandlerInterface<T>,
	): void;
	unregisterAll(): void;
}
