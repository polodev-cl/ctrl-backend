import axios          from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//TEST
@Injectable()
export class AxiosService {
  constructor(private readonly configService: ConfigService) {}

  public async createUser(createUserDto: any): Promise<any> {
    const lambdaUrl = this.configService.get('lambda.cognitoUser');
    
    return await axios.post(`${ lambdaUrl }`, {
      id: createUserDto.id.toString(),
      nombres: createUserDto.nombres,
      email: createUserDto.email
    }, {timeout: 15000, timeoutErrorMessage: 'Lambda cognito no disponible'});
  }
}
