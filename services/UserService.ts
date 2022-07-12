import axios from 'axios';
import { SigninReqType } from 'redux/sagas/authSaga';

const USER_API_URL = '/api/v1';

export class UserService {
  public static async signin(reqData: SigninReqType): Promise<string> {
    const response = await axios.post(`${USER_API_URL}/common/login`, reqData);
    return response.data.data;
  }

  public static async signOut(token: string): Promise<void> {
    await axios.get(`${USER_API_URL}/common/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public static async getUserInfo(token: string): Promise<any> {
    await axios.get(`${USER_API_URL}/user/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
