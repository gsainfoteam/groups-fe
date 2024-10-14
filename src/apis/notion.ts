import groupsApi from "./interceptor";
import { ExtendedRecordMap } from "notion-types";

export const getNotionPage = async (pageId: string):Promise<ExtendedRecordMap> => {
  try {  
    const res = await groupsApi.get(`/notion/${pageId}`);
    return res.data;  
  } catch (error) {
    throw error;  
  }  
}