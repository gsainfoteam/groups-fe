import axios from 'axios';
import groupsApi from "./interceptor";
import { NotionAPI } from 'notion-client';

export const getNotionPage = async (pageId: string) => {
  const recordMap = groupsApi.get(`/notion/${pageId}`).then( 
    (res) => {
      console.log(res)
      return res.data
    } );
  return recordMap;
}