import { Transform } from 'class-transformer';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
})
export default abstract class BaseModel extends Model {
  @Column({
    type: DataType.DATE,
  })
  @Transform(
    (params) => {
      return (params.value as unknown as Date).toISOString();
    },
    {
      toPlainOnly: true,
    },
  )
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  @Transform(
    (params) => {
      return params.value
        ? (params.value as unknown as Date).toISOString()
        : null;
    },
    {
      toPlainOnly: true,
    },
  )
  updatedAt: Date | null;
}
