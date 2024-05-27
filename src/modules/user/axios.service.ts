import axios          from 'axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AxiosService {
  private apiUrl = process.env.LAMBDA_URL;

  public async createUser(createUserDto: any): Promise<any> {
    return await axios.post(`${ this.apiUrl }/user`, {
      id: createUserDto.id.toString(),
      nombres: createUserDto.nombres,
      email: createUserDto.email
    }, {timeout: 15000, timeoutErrorMessage: 'Lambda cognito no disponible'});
  }
}
