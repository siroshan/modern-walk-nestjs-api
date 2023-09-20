// src/articles/entities/article.entity.ts

import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  roles: Role[];

  @ApiProperty()
  password: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
