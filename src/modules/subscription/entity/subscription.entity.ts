import { Column, Entity } from 'typeorm';
import {RoleEnum} from "@app/common/enums/role.enum";
import {BaseEntity} from "@app/common/entities/base.entity";

@Entity({name: 'subscription'})
export class SubscriptionEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  role: RoleEnum;

  @Column({ type: 'boolean', nullable: false, default: false })
  allowShowInfo: boolean;

  @Column({ type: 'varchar', nullable: true })
  profession: string;
}