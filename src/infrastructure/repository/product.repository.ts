import { eq } from "drizzle-orm";
import { Product } from "../../domain/entity/product";
import type { ProductRepositoryInterface } from "../../domain/repository/product-repository.interface";
import type { Drizzle } from "../db/drizzle/db";
import { products } from "../db/drizzle/schema";

export class ProductRepository implements ProductRepositoryInterface {
	constructor(private readonly db: Drizzle) {}

	async create(entity: Product): Promise<void> {
		await this.db.insert(products).values({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}

	async update(entity: Product): Promise<void> {
		await this.db
			.update(products)
			.set({ name: entity.name, price: entity.price })
			.where(eq(products.id, entity.id));
	}

	async findById(id: string): Promise<Product> {
		const [result] = await this.db
			.select()
			.from(products)
			.where(eq(products.id, id))
			.limit(1);

		return new Product(result.id, result.name, result.price);
	}

	async findAll(): Promise<Product[]> {
		const result = await this.db.select().from(products);
		return result.map((row) => new Product(row.id, row.name, row.price));
	}
}
