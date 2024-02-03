import { Database } from "bun:sqlite";
import { expect, it, describe, beforeEach, afterEach } from "bun:test";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { databaseFactory, type Drizzle } from "../db/drizzle/db";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";
import { customers, orders } from "../db/drizzle/schema";
import { eq } from "drizzle-orm";
import { CustomerRepository } from "./customer.repository";
import { ProductRepository } from "./product.repository";
import { Product } from "../../domain/entity/product";
import { OrderItem } from "../../domain/entity/order_item";
import { Order } from "../../domain/entity/order";
import { OrderRepository } from "./order.repository";

describe("Order repository test", () => {
	let connection: Database;
	let db: Drizzle;

	beforeEach(async () => {
		connection = new Database(":memory:");
		db = databaseFactory(connection);
		await migrate(db, { migrationsFolder: "./drizzle" });
	});

	afterEach(async () => {
		connection.close();
	});

	it("should create a new order", async () => {
		const customer = new Customer("1", "name");
		customer.address = new Address("street", 123, "zip", "city");
		const customerRepository = new CustomerRepository(db);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository(db);
		const product = new Product("1", "product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.id,
			product.name,
			product.price,
			2,
		);
		const order = new Order("1", customer.id, [orderItem]);

		const orderRepository = new OrderRepository(db);
		await orderRepository.create(order);

		const createdOrder = await db.query.orders.findMany({
			where: eq(orders.id, order.id),
			with: { items: true },
		});

		expect(createdOrder[0]).toStrictEqual({
			id: order.id,
			customerId: order.customerId,
			items: [
				{
					id: orderItem.id,
					productId: orderItem.productId,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					orderId: order.id,
				},
			],
			total: order.total(),
		});
	});
});
