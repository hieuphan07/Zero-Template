import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Property } from 'src/shared/decorator/property.decorator';
import { PropertyType } from 'src/shared/enum/property-type';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @Property(PropertyType.Sort)
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'uuid', type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Property(PropertyType.Search)
  @Property(PropertyType.Sort)
  @Column({ name: 'username', type: 'varchar', length: 150, nullable: false })
  @Length(2, 150)
  username: string;

  @Property(PropertyType.Search)
  @Property(PropertyType.Sort)
  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  @Length(8, 32)
  password: string;

  @Property(PropertyType.Search)
  @Property(PropertyType.Sort)
  @Column({ name: 'phone_number', type: 'varchar', length: 15, nullable: true })
  phoneNumber: string;

  @Property(PropertyType.Sort)
  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Property(PropertyType.Sort)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Property(PropertyType.Sort)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ name: 'refresh_token', type: 'varchar', length: 255, nullable: true })
  refreshToken: string;
}
