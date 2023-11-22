import { AuthorState } from "./AuthorState";

export type KratongState = {
  krathong: string | undefined;
  blessing: string | undefined;
  author1: AuthorState;
  author2?: AuthorState;
};
