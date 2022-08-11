export interface ILoadProjectData {
  applicationStatus: boolean;
  bookmark: boolean;
  currentPeople: number;
  endDate: string;
  introduction: string;
  maxPeople: number;
  name: string;
  projectNo: number;
  projectPositionDetailDtoList: [
    {
      positionName: string;
      projectPositionNo: number;
      userDto: {
        name: string;
        no: number;
        register: boolean;
      };
    }
  ];
  startDate: string;
  state: boolean;
  technicalStackList: string[];
}
export interface IProject {
  singleProject: null | ILoadProjectData;

  loadProjectPending: boolean;
  loadProjectSuccess: boolean;
  loadProjectError: string | null | unknown;
}

export const initialState: IProject = {
  singleProject: null,

  loadProjectPending: false,
  loadProjectSuccess: false,
  loadProjectError: null,
};
