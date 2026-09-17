import { createQuery } from "../factories/queryFactory";
import { TPostseasonDto } from "./types";

export const getPostseason = () => {
  return createQuery<TPostseasonDto[]>(["postseason"], "/api/postseasons");
};
