import { appApi } from './AppApi';

export interface ProjectPreviewType {
  offset?: number;
  page?: number;
  size?: number;
  paged?: boolean;
  searchContent?: string;
  'sort.sorted'?: boolean;
  'sort.unsorted'?: boolean;
  unpaged?: boolean;
}

export class ProjectService {
  public static async recruitingProjectPreview() {
    const response = await appApi.get('/project/recruitment', {
      params: {
        offset: 0,
        page: 0,
        size: 5,
      },
    });
    return response.data.data;
  }

  public static async recruitedProjectPreview() {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        offset: 0,
        page: 0,
        size: 5,
      },
    });
    return response.data.data;
  }

  public static async recruitingProject(reqData: ProjectPreviewType) {
    const response = await appApi.get('/project/recruitment', {
      params: {
        ...reqData,
        offset: 0,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async recruitedProject(reqData: ProjectPreviewType) {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        ...reqData,
        offset: 0,
        size: 12,
      },
    });
    return response.data.data;
  }
}
