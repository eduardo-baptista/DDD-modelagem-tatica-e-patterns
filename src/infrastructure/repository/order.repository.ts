import type { Order } from "../../domain/entity/order";
import type { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import type { Drizzle } from "../db/drizzle/db";
import { orderItems, orders } from "../db/drizzle/schema";

export class OrderRepository implements OrderRepositoryInterface {
	constructor(private db: Drizzle) {}

	async create(entity: Order): Promise<void> {
		await this.db.transaction(async (tx) => {
			await tx.insert(orders).values({
				customerId: entity.customerId,
				id: entity.id,
				total: entity.total(),
			});

			await tx.insert(orderItems).values(
				entity.items.map((item) => ({
					id: item.id,
					name: item.name,
					orderId: entity.id,
					price: item.price,
					productId: item.productId,
					quantity: item.quantity,
				})),
			);
		});
	}
	update(entity: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	findById(id: string): Promise<Order> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<Order[]> {
		throw new Error("Method not implemented.");
	}
}
