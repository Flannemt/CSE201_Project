import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes, type Optional, type WhereAttributeHash } from 'sequelize';
import { Message } from './message';
import type { Snowflake } from './user';

export interface ThreadMember {
	id: Snowflake;
	lastRead: Snowflake | null;
}

export class Thread extends Model<InferAttributes<Thread>, InferCreationAttributes<Thread>> {
	// Default
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	// Added
	declare uuid: Snowflake;
	declare author: Snowflake;
	declare users: CreationOptional<ThreadMember[]>;
	declare messages: CreationOptional<Message[]>;
}

export function ThreadsInit(sequelize: Sequelize) {
	Thread.init(
		{
			uuid: {
				type: DataTypes.STRING,
				unique: true,
				primaryKey: true,
				allowNull: false,
			},

			author: DataTypes.STRING,

			users: { 
				type: DataTypes.JSONB,
				defaultValue: []
			},

			messages: {
				type: DataTypes.JSONB,
				defaultValue: []
			},

			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize: sequelize,
			tableName: 'threads',
			freezeTableName: true,
		}
	);

	Thread.hasMany(Message, {
		foreignKey: 'thread',
		sourceKey: 'uuid',
	});

	return Thread;
}

// No idea if this is how you're supposed to do it, but it works?
export type ThreadWhereOptions = WhereAttributeHash<Thread>;

type ThreadCreationOptions = InferCreationAttributes<Thread>;
export type ThreadUpdateOptions = Optional<ThreadCreationOptions, keyof ThreadCreationOptions>;

export type ThreadData = Thread;