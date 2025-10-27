import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {SubscriptionService} from "@modules/subscription/subscription.service";
import {CreateSubscriptionDto} from "@modules/subscription/dto/create.subscription.dto";


@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {
  }

  @Get()
  async getSubscribedUsers() {
    return this.subscriptionService.getSubscribedUsers()
  }

  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto
  ) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }
}
