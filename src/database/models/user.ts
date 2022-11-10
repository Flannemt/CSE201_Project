import { DataTypes, Model, Sequelize } from 'sequelize';
import type {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Optional,
	WhereAttributeHash
} from 'sequelize';
import { Thread } from './thread';

export type Snowflake = string;

export interface DiscordUser {
	id: string;
	username: string;
	discriminator: string;
	avatar: string;
	avatar_decoration?: string | null;
	email?: string;
	verified: boolean;
	mfa_enabled: boolean;
	locale: string;
	premium_type?: string;
	public_flags: number;
	flags: number;
	premium_since?: string;
	banner?: string | null;
	banner_color?: string | null;
	accent_color?: string | null;
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	// Default
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	// Added
	declare uuid: string;
	declare user: DiscordUser;
	declare threads: CreationOptional<Snowflake[]>;
}

export function UsersInit(sequelize: Sequelize) {
	User.init(
		{
			uuid: {
				type: DataTypes.STRING,
				unique: true,
				primaryKey: true,
				allowNull: false
			},

			user: DataTypes.JSONB,

			threads: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: []
			},

			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			sequelize: sequelize,
			tableName: 'users',
			freezeTableName: true
		}
	);

	return User;
}

// No idea if this is how you're supposed to do it, but it works?
export type UserWhereOptions = WhereAttributeHash<User>;

type UserCreationOptions = InferCreationAttributes<User>;
export type UserUpdateOptions = Optional<UserCreationOptions, keyof UserCreationOptions>;

export type UserData = User;
