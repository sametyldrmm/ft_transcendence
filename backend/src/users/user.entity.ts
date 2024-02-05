import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
} from 'typeorm';
import { Friend } from '../friend/entities/friend.entity';
import { ChannelUser } from '../friend/entities/channel-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  intra_id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  //@Column()
  //bearer_token : string;

  @Column({default: './ekrem.jpeg'})
  avatar: string;
  
  @OneToMany(() => Friend, (friend) => friend.friend)
  @JoinColumn()
  friends: Friend[];

  @OneToMany(() => ChannelUser, (channelUser) => channelUser.user)
  @JoinColumn()
  channels: ChannelUser[];
  
  @Column('bool', { default: false })
  twoFA: boolean;

  @Column({ default: false })
  is_online: boolean;

  @Column({ default: false })
  is_ingame: boolean;

  @AfterInsert()
  logInsert() {
        console.log(`Inserted User with ID: ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
      console.log(`Updated User with ID: ${this.id}`);
  }

  @BeforeRemove()
  logRemove() {
      console.log(`Removing User with ID: ${this.id}`);
  }
}
