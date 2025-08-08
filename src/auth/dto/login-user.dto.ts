import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'testuser', description: 'The username of the user' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;
}
