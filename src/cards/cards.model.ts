import { Table, Column, DataType, Model } from 'sequelize-typescript';

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
}