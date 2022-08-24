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

  public static async recruitingProject(projectNo?: number) {
    const response = await appApi.get('/project/recruitment', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data.content;
  }

  public static async recruitedProject(projectNo?: number) {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data.content;
  }

  public static async createdProjectPreview(projectNo?: number) {
    const response = await appApi.get('/project/create/self', {
      params: {
        projectNo,
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async createdProject(projectNo?: number) {
    const response = await appApi.get('/project/create/self', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data.content;
  }

  public static async joinedProjectPreview(projectNo?: number) {
    const response = await appApi.get('/project/participate', {
      params: {
        projectNo,
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async joinedProject(projectNo?: number) {
    const response = await appApi.get('/project/participate', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data.content;
  }

  public static async appliedProjectPreview(projectNo?: number) {
    const response = await appApi.get('/project/application', {
      params: {
        projectNo,
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async appliedProject(projectNo?: number) {
    const response = await appApi.get('/project/application', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data.content;
  }
}
