import { BlockMap, ExtendedRecordMap } from "notion-types";
import groupsApi from "./interceptor";

export const getNotionPage = async (
  pageId: string,
): Promise<ExtendedRecordMap> => {
  const res = await groupsApi.get<BlockMap>(`/notion/${pageId}`);
  return { block: res.data } as ExtendedRecordMap;
  // react-notion-x expects ExtendedRecordMap that is generated from notion-client library.
  // However, notion-client is not working well with the current backend server (we don't know why)
  // So we have utilized a compatible api
};
