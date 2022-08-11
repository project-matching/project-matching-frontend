export interface IPositionList {
  positionName: string;
  positionNo: number;
}

export interface IPositionListObj {
  position: {
    positionName: string;
    positionNo: number;
  };
  projectRegisterUserDto: number | null;
}

export interface IPosition {
  positionList: IPositionList[];

  loadPositionPending: boolean;
  loadPositionSuccess: boolean;
  loadPositionError: any;
}

export const initialState: IPosition = {
  positionList: [],

  loadPositionPending: false,
  loadPositionSuccess: false,
  loadPositionError: null,
};
