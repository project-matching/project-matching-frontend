import { appApi } from './AppApi';

export class TechStackService {
  public static async getTechStacks() {
    const response = await appApi.get('/technicalStack');
    return response.data.data;
  }
}
