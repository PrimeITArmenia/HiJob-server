import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {SubscriptionEntity} from "@modules/subscription/entity/subscription.entity";
import {CreateSubscriptionDto} from "@modules/subscription/dto/create.subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity) private readonly subscriptionRepository: Repository<SubscriptionEntity>
  ) {
  }
  async getSubscribedUsers() {
    return await this.subscriptionRepository.find({});
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto){
    const existingSubscription = await this.subscriptionRepository.findOne({
      where: {
        email: createSubscriptionDto.email
      }
    });

    if (existingSubscription) {
      throw new HttpException('Email is already subscribed', HttpStatus.BAD_REQUEST);
    }

    const newSubscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
    });

    return await this.subscriptionRepository.save(newSubscription);
  }
}
