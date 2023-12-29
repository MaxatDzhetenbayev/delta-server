import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Cards } from '../cards/cards.model';

interface TagsCreationAttrs {
  name: string;
}



@Table({tableName: 'tags', timestamps: false})
export class Tags extends Model<Tags, TagsCreationAttrs> {
  @Column
  name: string;

  @HasMany(() => Cards)
  flashCards: Cards[];
}
