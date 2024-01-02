import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Tags } from '../tags/tags.model';
import { Users } from 'src/users/users.model';
interface CardsCreationAttrs {
  question: string;
  answer: string;
}

@Table({ tableName: 'cards', timestamps: false })
export class Cards extends Model<Cards, CardsCreationAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  question: string;

  @Column({ type: DataType.STRING, allowNull: false })
  answer: string;

  @ForeignKey(() => Tags)
  @Column
  tagId: number;

  @ForeignKey(() => Users)
  userId: number;

  @BelongsTo(() => Tags)
  tag: Tags;
}
