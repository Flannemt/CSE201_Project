import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, Sequelize, DataTypes, type Optional, type WhereAttributeHash } from 'sequelize';
import type { Snowflake } from './user';

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
	// Default
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	// Added
	declare uuid: Snowflake;
	declare author: Snowflake;
	declare thread: Snowflake;
	declare content: string;
}

export function MessagesInit(sequelize: Sequelize) {
	Message.init(
		{
			uuid: {
				type: DataTypes.STRING,
				unique: true,
				primaryKey: true,
				allowNull: false,
			},

			author: DataTypes.STRING,
			thread: DataTypes.STRING,
			content: DataTypes.STRING,

			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize: sequelize,
			tableName: 'messages',
			freezeTableName: true,
		}
	);

	return Message;
}

// No idea if this is how you're supposed to do it, but it works?
export type MessageWhereOptions = WhereAttributeHash<Message>;

type MessageCreationOptions = InferCreationAttributes<Message>;
export type MessageUpdateOptions = Optional<MessageCreationOptions, keyof MessageCreationOptions>;

export type MessageData = Message;