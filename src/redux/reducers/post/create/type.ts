export interface ICreateProject {
  createProjectPending: boolean;
  createProjectSuccess: boolean;
  createProjectError: string | null | unknown;
}

export const initialState: ICreateProject = {
  createProjectPending: false,
  createProjectSuccess: false,
  createProjectError: null,
};

export interface IPropsCreateProject {
  endDate: string;
  introduction: string;
  name: string;
  projectPositionRegisterDtoList: [
    {
      positionNo: number;
      projectRegisterUserDto: {
        no: number | null;
      };
    }
  ];
  projectTechnicalStackList: number[];
  startDate: string;
}
