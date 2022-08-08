export interface IPost {
  mainPosts: any;

  createPostPending: boolean;
  createPostSuccess: boolean;
  createPostError: string | null | unknown;

  deletePostPending: boolean;
  deletePostSuccess: boolean;
  deletePostError: string | null | unknown;

  updatePostPending: boolean;
  updatePostSuccess: boolean;
  updatePostError: string | null | unknown;

  loadPostPending: boolean;
  loadPostSuccess: boolean;
  loadPostError: string | null | unknown;
}

export const initialState: IPost = {
  mainPosts: [],

  createPostPending: false,
  createPostSuccess: false,
  createPostError: null,

  deletePostPending: false,
  deletePostSuccess: false,
  deletePostError: null,

  updatePostPending: false,
  updatePostSuccess: false,
  updatePostError: null,

  loadPostPending: false,
  loadPostSuccess: false,
  loadPostError: null,
};

// export interface IProjectPosition {
//   position: string[];
//   technicalStack: string[];
// }
export interface ICreatePost {
  createDate: string;
  startDate: string;
  endDate: string;
  introduction: string;
  maxPeople: number;
  name: string;
  profile: string;
  position: string[];
  technicalStack: string[];
  //   projectPosition: IProjectPosition[];
}
