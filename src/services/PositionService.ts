import { appApi } from './AppApi';

export interface PositionType {
  positionName: string;
  positionNo: number;
}

export class PositionService {
  public static async getPositions(): Promise<PositionType[]> {
    const response = await appApi.get('/position');
    return response.data.data;
  }

  public static async addPosition(positionName: string) {
    await appApi.post('/position', { positionName });
  }

  public static async editPosition({ positionName, positionNo }: PositionType) {
    await appApi.put(`/position/${positionNo}`, {
      positionName,
    });
  }

  public static async expelPosition(positionNo: number, reason: string) {
    await appApi.delete(`/projectposition/${positionNo}/expulsion`, { data: {
      reason
    } });
  }
}
