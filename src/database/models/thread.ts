import type { Message } from './message';
import type { Snowflake } from './user';

export interface Thread {
	id: Snowflake;
	users: {
		id: Snowflake;
		lastRead: Snowflake | null;
	}[];
	messageCache: Message[];
	createdAt: number;
}

export class Thread implements Thread {
	constructor(userId: Snowflake, id: Snowflake) {
		this.id = id;
		this.users = [
			{
				id: userId,
				lastRead: null
			}
		];
		this.messageCache = [];
		this.createdAt = Date.now();
	}

	toJSON() {
		return {
			id: this.id,
			users: this.users,
			createdAt: this.createdAt,
			messageCache: this.messageCache
		};
	}
}
