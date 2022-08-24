import { appApi } from './AppApi';

export class PositionService {
  public static async getPositions() {
    const response = await appApi.get('/position');
    return response.data.data;
  }
}
