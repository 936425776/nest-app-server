import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Version('1')
  getUser(): string {
    return 'user version1';
  }
  @Get()
  @Version('2')
  getUser2(): string {
    return 'user version2';
  }
  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      console.log('');
      throw new BusinessException('你这个参数错了');
    }
    return '';
  }
  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }
}
