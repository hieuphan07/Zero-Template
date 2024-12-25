import { Controller, Get, Post, Put, Body, Param, HttpCode } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(201)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.userService.getUser(Number(id));
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(Number(id), updateUserDto);
    }
}