import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';


@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly userRepository: IUserRepository) { }

    async validate(id: number) {
        const user = await this.userRepository.findById(id);
        return !!user;
    }

    defaultMessage() {
        return 'Người dùng không tồn tại';
    }
}