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

export interface ProjectType {
  bookMark: boolean;
  currentPeople: number;
  maxPeople: number;
  name: string;
  projectNo: number;
  projectSimplePositionDtoList: [
    {
      positionName: string;
      positionNo: number;
      projectNo: number;
    }
  ];
  projectSimpleTechnicalStackDtoList: [
    {
      image: string;
      projectNo: number;
      technicalStackName: string;
    }
  ];
  register: string;
  viewCount: number;
}

interface ApplyRequestType {
  gitHub: string;
  motive: string;
  projectPositionNo: number | null;
  technicalStackList: string[];
}

interface dto {
  userNo: number | null;
}

interface positionDto {
  positionNo: number;
  projectRegisterUserDto: dto | null;
}

interface RegisterProjectData {
  startDate: string;
  endDate: string;
  introduction: string;
  name: string;
  projectPositionRegisterDtoList: (positionDto | null)[];
  projectTechnicalStackList: number[];
}

interface projectParticipateRefusalRequestDto {
  reason: string;
}

interface addPosition {
  count: number;
  positionNumber: number;
}

interface modifiedProject {
  endDate: string;
  introduction: string;
  name: string;
  projectPositionAddDtoList: addPosition[];
  projectPositionDeleteDtoList: { projectPositionNo: number }[];
  projectTechnicalStackNoList: number[];
  startDate: string;
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

  public static async recruitingProject(projectNo: number | null = null) {
    const response = await appApi.get('/project/recruitment', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async recruitedProject(projectNo: number | null = null) {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async searchedRecruitingProject(
    searchContent: string | null,
    projectNo: number | null = null
  ) {
    const response = await appApi.get('/project/recruitment', {
      params: {
        searchContent,
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async searchedRecruitedProject(
    searchContent: string | null,
    projectNo: number | null = null
  ) {
    const response = await appApi.get('/project/recruitment/complete', {
      params: {
        searchContent,
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async createdProjectPreview(projectNo: number | null = null) {
    const response = await appApi.get('/project/create/self', {
      params: {
        projectNo,
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async createdProject(projectNo: number | null = null) {
    const response = await appApi.get('/project/create/self', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async joinedProjectPreview(projectNo: number | null = null) {
    const response = await appApi.get('/project/participate', {
      params: {
        projectNo,
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async joinedProject(projectNo: number | null = null) {
    const response = await appApi.get('/project/participate', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async appliedProjectPreview(projectNo: number | null = null) {
    const response = await appApi.get('/project/application', {
      params: {
        projectNo,
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async appliedProject(projectNo: number | null = null) {
    const response = await appApi.get('/project/application', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async applyProject(reqData: ApplyRequestType) {
    const response = await appApi.post('/participate', reqData);

    return response;
  }

  public static async getProjectDetail(projectNo: number) {
    const response = await appApi.get(`/project/${projectNo}`);

    return response.data;
  }

  public static async registerProject(
    projectRegisterRequestDto: RegisterProjectData
  ) {
    const response = await appApi.post('/project', projectRegisterRequestDto);

    return response;
  }

  public static async getProjectApplicants(projectNo: string) {
    const response = await appApi.get(`/participate/${projectNo}`);

    return response.data.data;
  }

  public static async allowProjectApplicant(projectParticipateNo: number) {
    const response = await appApi.post(
      `/participate/${projectParticipateNo}/permit`
    );

    return response.data;
  }

  public static async rejectProjectApplicant(
    projectParticipateNo: number,
    reqData: projectParticipateRefusalRequestDto
  ) {
    const response = await appApi.post(
      `/participate/${projectParticipateNo}/refusal`,
      reqData
    );

    return response.data;
  }

  public static async modifyProject(
    projectNo: string,
    projectUpdateRequestDto: modifiedProject
  ) {
    const response = await appApi.patch(
      `/project/${projectNo}`,
      projectUpdateRequestDto
    );

    return response.data;
  }
}
