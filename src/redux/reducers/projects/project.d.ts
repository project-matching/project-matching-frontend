export interface ProjectDtoType {
  bookMark: boolean;
  currentPeople: number;
  maxPeople: number;
  name: string;
  projectNo: number;
  projectSimplePositionDtoList: Array<{
    positionName: string;
    positionNo: number;
    projectNo: number;
  }>;
  projectSimpleTechnicalStackDtoList: Array<{
    image: string;
    projectNo: number;
    technicalStackName: string;
  }>;
  register: string;
  viewCount: number;
}

export interface ProjectState {
  loading: boolean;
  error: any;
  projectList: ProjectDtoType[];
}
