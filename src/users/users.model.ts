import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { Cards } from 'src/cards/cards.model';
interface UsersCreationAttrs {
  username: string;
  passwordhash: string;
}

@Table({ tableName: 'users', timestamps: false })
export class Users extends Model<Users, UsersCreationAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordhash: string;

  @HasMany(() => Cards)
  cards: Cards[];
}
