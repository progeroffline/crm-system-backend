import { Role } from 'generated/prisma';

export class UserPayloadDto {
  sub: number;
  username: string;
  role: Role;
}
