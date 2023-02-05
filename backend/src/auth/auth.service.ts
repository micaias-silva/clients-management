import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ClientsService } from 'src/clients/shared/clients.service';
import { JwtService } from '@nestjs/jwt';
import { GeneratedJwtToken, RequestUser } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async validateClient(
    email: string,
    pass: string,
  ): Promise<RequestUser | null> {
    const client = await (
      await this.clientsService.findOneByEmail(email)
    ).toObject();
    const validPassword = await compare(pass, client.password);

    if (client && validPassword) {
      return {
        sub: client._id.toString(),
        email: client.email,
      };
    }

    return null;
  }

  async login(client: RequestUser): Promise<GeneratedJwtToken> {
    const payload = { ...client };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
