import { appApi } from './AppApi';

export interface TechStackSendType {
  formData: FormData;
  technicalStackNo: number;
}
export class TechStackService {
  public static async getTechStacks() {
    const response = await appApi.get('/technicalStack');
    return response.data.data;
  }

  public static async addTechStack(formData: FormData) {
    await appApi.post('/technicalStack', formData);
  }

  public static async editTechStack({
    technicalStackNo,
    formData,
  }: TechStackSendType) {
    await appApi.put(`/technicalStack/${technicalStackNo}`, formData);
  }
}
