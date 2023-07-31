import { ApiProperty } from '@nestjs/swagger';
import { Column, IsEmail, Model, Table } from 'sequelize-typescript';

interface IAdmin {
  email: string;
  password: string;
}

@Table({
  tableName: 'admins',
  timestamps: false,
  defaultScope: { attributes: { exclude: ['password'] } },
})
export class Admin extends Model<Admin, IAdmin> {
  @ApiProperty({ example: 1 })
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail
  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;
}
