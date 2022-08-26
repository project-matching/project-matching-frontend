import { appApi } from "./AppApi";

interface dto {
  content: string,
}

export class CommentService {
  public static async getComments(projectNo?: string | string[]) {
    const response = await appApi.get(`/comment/${projectNo}`);

    return response;
  }

  public static async postComment(projectNo: string, dto: dto) {
    const response = await appApi.post(`/comment/${projectNo}`, dto);

    return response.data;
  }

  public static async fixComment(commentNo: string, dto: dto) {
    const response = await appApi.patch(`/comment/${commentNo}`, dto);

    return response.data;
  }

  public static async deleteComment(commentNo: string) {
    const response =  await appApi.delete(`/comment/${commentNo}`);
    
    return response.data;
  }
}
