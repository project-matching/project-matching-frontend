import { UserInfoType } from 'src/redux/reducers/users';
import { SigninReqType, SignupReqType } from 'src/redux/sagas/authSaga';
import { appApi } from './AppApi';

interface confirmEmailType {
  email: string;
  authToken: string;
}

export class UserService {
  public static async signup(reqData: SignupReqType) {
    await appApi.post(`/user`, reqData);
  }

  public static async confirmEmail(reqData: confirmEmailType): Promise<string> {
    const response = await appApi.post(`/user/confirm`, reqData);
    return response.data.data; // jwt
  }

  public static async signin(reqData: SigninReqType): Promise<string> {
    const response = await appApi.post(`/common/login`, reqData);
    return response.data.data;
  }

  public static async signOut(): Promise<void> {
    await appApi.get(`/common/logout`);
  }

  public static async getUserInfo(): Promise<UserInfoType> {
    const response = await appApi.get(`/user/info`);
    return response.data.data ?? null;
  }
}
