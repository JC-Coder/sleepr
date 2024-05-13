import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user.dto';
import { UsersRepository } from 'apps/auth/src/users/users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
