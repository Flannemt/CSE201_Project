export type Snowflake = string;

export interface User {
	id: Snowflake;
	threads: Snowflake[];
	friends: Snowflake[];
	createdAt: number;
}

export class User {
	id: Snowflake;
	threads: Snowflake[];
	friends: Snowflake[];
	createdAt: number;

	constructor(id: Snowflake) {
		this.id = id;
		this.threads = [];
		this.friends = [];
		this.createdAt = Date.now();
	}

	toJSON() {
		return {
			id: this.id,
			threads: this.threads,
			friends: this.friends,
			createdAt: this.createdAt
		};
	}
}
