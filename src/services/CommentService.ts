import { appApi } from './AppApi';

interface dto {
  content: string;
}

export class CommentService {
  public static async getComments(projectNo?: number | number[]) {
    const response = await appApi.get(`/comment/${projectNo}`);

    return response.data;
  }

  public static async postComment(projectNo: number, dto: dto) {
    const response = await appApi.post(`/comment/${projectNo}`, dto);

    return response.data;
  }

  public static async fixComment(commentNo: number, dto: dto) {
    const response = await appApi.patch(`/comment/${commentNo}`, dto);

    return response.data;
  }

  public static async deleteComment(commentNo: number) {
    const response = await appApi.delete(`/comment/${commentNo}`);

    return response.data;
  }
}
