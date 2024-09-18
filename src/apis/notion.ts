import axios from 'axios';

export const getNotionPage = async (pageId: string) => {
  // const notion = new NotionAPI();

  // const recordMap = await notion.getPage(
  //   pageId,
  // );
  
  const recordMap = axios.get("https://notion-api.splitbee.io/v1/page/" + pageId ).then( res => res.data );

  return recordMap;
}