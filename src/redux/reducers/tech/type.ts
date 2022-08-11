export interface ITechList {
  image: string;
  technicalStackName: string;
  technicalStackNo: number;
}

export interface ITech {
  techList: ITechList[];
  loadTechPending: boolean;
  loadTechSuccess: boolean;
  loadTechError: string | null | unknown;
}

export const initialState: ITech = {
  techList: [],
  loadTechPending: false,
  loadTechSuccess: false,
  loadTechError: null,
};
