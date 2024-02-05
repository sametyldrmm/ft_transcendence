import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';


import { UsersDto } from './dtos/user.dto'
import { UpdateProfileDto } from './dtos/update-profile.dto'
import { ChannelUser } from '../friend/entities/channel-user.entity';


import { User } from './user.entity';
import { Friend } from '../friend/entities/friend.entity';
import { MatchService } from '../match/match.service';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly matchService: MatchService
    ) {}

    async isLoginOkayForMe(userId : number, login: string){
      
      if (await this.isExist({login}))
        return false;
      
      const user = await this.getOne({id : userId});

      const intra_id = user.intra_id;

      const bearer_token = 2;
      return true;
    }

    async create(user : UsersDto) : Promise<User> {
        const newUser =  this.userRepository.create(user);

        return (await this.userRepository.save(newUser));
    }

    async getAll(): Promise<User[]>  {
        return await this.userRepository.find();
    }

    async getOne(where: FindOptionsWhere<User>): Promise<User> {
        return (await this.userRepository.findOneBy(where));
      }

    async isExist(where: FindOptionsWhere<User>) {
        return this.userRepository.exist({ where });
    }

    async remove(where: any) {
        const user = await this.userRepository.findOneBy(where);

        if (!user)
            throw new NotFoundException('user not found');


        return (await this.userRepository.remove(user));
    }
    
    async update(where: any, data : UsersDto) {
        return this.userRepository.update(where, data); //ilk eleman dönüyo bunu bi incele
      }


    async updateProfile(where: any, data : UpdateProfileDto) : Promise<User> {
        const user = await this.userRepository.findOne(where);
        //const user2 = await this.userRepository.findOne(where);

        if (!user)
            throw new NotFoundException('User not found');
	if (data.avatar)
		user.avatar = data.avatar;
	if(data.login)
		user.login = data.login;
	if(data.twoFA != null)
		user.twoFA = data.twoFA;
        console.log(user);
        return this.userRepository.save(user); //ilk eleman dönüyo bunu bi incele
      }

      async getTotalWins() {
        return this.matchService.getTotalWins();
      }
     


      async getMatchHistory(id: number, limit: number) {
        return this.matchService.getMatchHistory(id, limit);
      }
        async findNonFriends(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.friends', 'friend')
      .where('user.id != :userId', { userId: id })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('friend.friend')
          .from(Friend, 'friend')
          .where('friend.user = :userId', { userId: id })
          .getQuery();

        return 'user.id NOT IN ' + subQuery;
      })
      .getMany();
  }   
      async findNonChannelMembers(currentUser: any, id: number) {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.id != :userId', { userId: currentUser.id })
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('channelUser.user')
            .from(ChannelUser, 'channelUser')
            .where('channelUser.channel = :channelId', { channelId: id })
            .getQuery();

          return 'user.id NOT IN ' + subQuery;
        })
        .getMany();
      }
      


      async clear(){
        //await this.userRepository.clear();
        this.userRepository.delete({is_ingame: false});
      }
}
