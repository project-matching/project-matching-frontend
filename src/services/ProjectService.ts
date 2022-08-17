import { appApi } from './AppApi';

export interface ProjectRequestType {
  offset?: number;
  page?: number;
  size?: number;
  projectNo?: number;
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
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async recruitedProjectPreview() {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async recruitingProject(reqData: ProjectRequestType) {
    const response = await appApi.get('/project/recruitment', {
      params: {
        ...reqData,
        size: 12,
      },
    });
    return response.data.data.content;
  }

  public static async recruitedProject(reqData: ProjectRequestType) {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        ...reqData,
        size: 12,
      },
    });
    return response.data.data.content;
  }
}
