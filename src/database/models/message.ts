import type { Snowflake } from './user';

export interface Message {
	uuid: Snowflake;
	author: Snowflake;
	content: string;
	timestamp: number;
}
