import { POSTGRES_URI } from '$env/static/private';
import { Sequelize } from 'sequelize';
import { UsersInit, type Snowflake } from './models/user';
import { ThreadsInit } from './models/thread';
import type { Message } from './models/message';
import type { DiscordUser } from '$lib/discord';

const sequelize = new Sequelize(POSTGRES_URI, {
	dialect: 'postgres',
	logging: false
});

const Users = UsersInit(sequelize);
const Threads = ThreadsInit(sequelize);

export let DBReady = false;

export async function SyncTables() {
	if (DBReady) return;
	DBReady = true;

	try {
		await sequelize.authenticate();

		await Users.sync({ force: false });
		await Threads.sync({ force: false });

		console.log('Connected to database.');
	} catch (error) {
		DBReady = false;
		console.log('Unable to connect to the database!');
		console.log(error);
	}
}

export async function GetUser(id: Snowflake) {
	if (!id) return null;
	return await Users.findOne({ where: { uuid: id } });
}

export async function GetUserData(id: Snowflake) {
	if (!id) return null;
	return await Users.findOne({
		where: { uuid: id },
		raw: true,
		nest: true
	});
}

export async function CreateUser(user: DiscordUser) {
	if (!user?.id) return null;
	await Users.create({ uuid: user.id, user: user });
	return await GetUserData(user.id);
}

export async function DeleteUser(id: Snowflake) {
	if (!id) return null;
	return await Users.destroy({ where: { uuid: id } });
}

export async function GetThread(id: Snowflake) {
	if (!id) return null;
	return await Threads.findOne({ where: { uuid: id } });
}

export async function GetThreadData(id: Snowflake) {
	if (!id) return null;
	return await Threads.findOne({
		where: { uuid: id },
		raw: true
	});
}

export async function CreateThread(userId: Snowflake) {
	if (!userId) return null;
	const thread = await Threads.create({
		uuid: GenerateSnowflake(),
		author: userId,
		messages: [],
		users: [
			{
				id: userId,
				lastRead: `${Date.now()}`
			}
		]
	});

	if (thread) {
		const user = await GetUser(userId);
		if (user) {
			user.threads = [...(user.threads ?? []), thread.uuid];
			user.save();
		}
	}

	return await GetThreadData(thread.uuid);
}

export async function SendMessage(userId: Snowflake, threadId: Snowflake, content: string) {
	if (!userId || !threadId || !content) return null;
	const thread = await GetThread(threadId);

	if (thread) {
		const message: Message = {
			uuid: GenerateSnowflake(),
			author: userId,
			content: content,
			timestamp: Date.now()
		};

		if (message) {
			thread.messages = [...(thread.messages ?? []), message];
			thread.save();

			return true;
		}
	}
	return false;
}

export async function DeleteThread(id: Snowflake) {
	if (!id) return null;
	const thread = await GetThread(id);
	const destroy = await Threads.destroy({ where: { uuid: id } });

	if (destroy && thread) {
		for (const member of thread.users) {
			const user = await GetUser(member.id);
			if (!user) continue;

			user.threads = user.threads.filter((thread) => thread !== id);
			user.save();
		}
	}

	return destroy;
}

// Generate unique Snowflake IDs in Discord's format
export function GenerateSnowflake() {
	return ((BigInt(Date.now()) - 1420070400000n) << 22n).toString();
}
