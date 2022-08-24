import { appApi } from './AppApi';

export class BookmarkService {
  public static async getBookmarks() {
    const response = await appApi.get('/bookmark');
    return response.data.data.content;
  }
  public static async postBookmarks(projectNo: number) {
    await appApi.post(`/bookmark/${projectNo}`);
  }
  public static async deleteBookmarks(projectNo: number) {
    await appApi.delete(`/bookmark/${projectNo}`);
  }
}
