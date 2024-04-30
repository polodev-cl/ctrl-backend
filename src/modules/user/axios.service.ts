import axios from 'axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AxiosService {
  private apiUrl = 'https://ojnp23xjswiywdlumgjvwfifp40pctui.lambda-url.us-east-1.on.aws';

  public async createUser(createUserDto: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/user`, {
        id: createUserDto.id.toString(), 
        nombres: createUserDto.nombres,
        email: createUserDto.email
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
