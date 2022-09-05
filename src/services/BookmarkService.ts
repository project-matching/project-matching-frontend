import { appApi } from './AppApi';

export class BookmarkService {
  public static async getBookmarks(projectNo?: number) {
    const response = await appApi.get('/bookmark', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }
  public static async postBookmarks(projectNo: number) {
    await appApi.post(`/bookmark/${projectNo}`);
  }
  public static async deleteBookmarks(projectNo: number) {
    await appApi.delete(`/bookmark/${projectNo}`);
  }
}
