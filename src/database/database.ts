// Temporary "database" for testing purposes

import { User, type Snowflake } from './models/user';
import { Thread } from './models/thread';

const Users = new Map<Snowflake, User>();
const Threads = new Map<Snowflake, Thread>();

export function GetUser(id: Snowflake) {
	return Users.get(id);
}

export function CreateUser(id: Snowflake) {
	const user = new User(id);
	Users.set(id, user);
	return user;
}

export function DeleteUser(id: Snowflake) {
	return Users.delete(id);
}

export function GetThread(id: Snowflake) {
	return Threads.get(id);
}

export function CreateThread(userId: Snowflake) {
	const thread = new Thread(userId, GenerateSnowflake());
	Threads.set(thread.id, thread);
	const user = GetUser(userId);
	if (user) {
		user.threads.push(thread.id);
	}
	return thread;
}

export function SendMessage(userId: Snowflake, threadId: Snowflake, content: string) {
	const thread = GetThread(threadId);
	if (thread) {
		thread.messageCache.push({
			id: GenerateSnowflake(),
			author: userId,
			thread: threadId,
			content,
			timestamp: Date.now()
		});
		return true;
	}
	return false;
}

export function DeleteThread(id: Snowflake) {
	return Threads.delete(id);
}

// Generate unique Snowflake IDs in Discord's format
export function GenerateSnowflake() {
	return ((BigInt(Date.now()) - 1420070400000n) << 22n).toString();
}
