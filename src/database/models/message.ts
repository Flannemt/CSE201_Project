import type { Snowflake } from './user';

export interface Message {
	id: Snowflake;
	author: Snowflake;
	thread: Snowflake;
	content: string;
	timestamp: number;
}
