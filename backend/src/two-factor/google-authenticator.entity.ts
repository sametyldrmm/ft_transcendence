import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GoogleAuthenticator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default : "default"})
  secret: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
