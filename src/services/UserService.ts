import { SigninReqType, SignupReqType } from 'src/redux/sagas/authSaga';
import { UserInfoType } from 'src/redux/sagas/userSaga';
import { appApi } from './AppApi';

export class UserService {
  public static async signup(reqData: SignupReqType) {
    await appApi.post(`/user`, reqData);
  }

  public static async signin(reqData: SigninReqType): Promise<string> {
    const response = await appApi.post(`/common/login`, reqData);
    return response.data.data;
  }

  public static async signOut(token: string): Promise<void> {
    await appApi.get(`/common/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public static async getUserInfo(token: string | null): Promise<UserInfoType> {
    const response = await appApi.get(`/user/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  }
}
