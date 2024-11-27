import React from 'react';

import { useTranslation } from "react-i18next";
import useSWR from "swr";
import axios from "axios";
import Zabo from "../zabo/Zabo";
import { ex_data } from './example';
import { Notice } from '@/types/interfaces';

const ziggleApi = axios.create({ baseURL: `https://api.stg.ziggle.gistory.me/`})

interface Reaction {
  emoji: string;
  count: number;
  isReacted: boolean;
}
interface Notices {
  list: Notice[];
  total: number;
}

const ITEMS_PER_PAGE = 30;
const API_ZIGGLE = "https://api.stg.ziggle.gistory.me"
const fetcher  = async (url:string) => {
    axios.get(url)
        .then(res => res.data)
}

const CategorizedNotices = ( {uuid} : {uuid: undefined|string}) => {
  const { t } = useTranslation();
  const {data : notices, error} = useSWR<Notices, Error>(`${API_ZIGGLE}/notice/group/${uuid}`,fetcher)
  if(!notices){
    return <div></div>
  }
  return (
    <>
      {notices.list.length ? (
        <>
          <div className="flex w-full flex-col md:max-w-[800px]">
            {...notices.list.map((notice: any) => (
              <React.Fragment key={notice.id}>
                {/* <Zabo key={notice.id} {...notice}/> */}
                <Zabo key={notice.id} {...notice}/>
                <div className="my-[30px] h-[1px] bg-greyLight dark:bg-d_greyBorder" />
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        {/* <div className="flex w-full justify-center">
          <div className="align-center flex flex-col justify-center">
            <div className="h-[100px]" />
            <div className="mx-auto h-[10px]" />

            <SearchNoResult />

            <p className="font-lg md:font-2xl pt-5 text-center font-bold text-secondaryText">
              {t("emptyNotices")}
            </p>
          </div>
        </div> */}
      )}
    </>
  );
};

export default CategorizedNotices;
