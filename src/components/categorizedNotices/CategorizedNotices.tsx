import React from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import axios from "axios";
import Zabo from "../zabo/Zabo";
import { ex_data } from "./example";
import { Notice } from "@/types/interfaces";
import SearchNoResult from '@/assets/icons/search-no-result.svg?react'
interface Notices {
  list: Notice[];
  page: number;
}

const ITEMS_PER_PAGE = 30;
const API_ZIGGLE = "https://api.stg.ziggle.gistory.me";
const fetcher = async (url: string) => {
  const res = await axios.get(url)
  return res.data
}

const CategorizedNotices = ({ uuid }: {uuid: undefined|string}) => {
  const { t } = useTranslation();
  const {data : notices} = useSWR<Notices>(`${API_ZIGGLE}/notice/group/${uuid}?offset=5&limit=${ITEMS_PER_PAGE}&lang=kr&orderBy=deadline`,fetcher)
  if(!notices){
    return <div>notices not found</div>
  }
  
  return (
    <>
      {notices.list.length ? (
        <>
          <div className="flex w-full flex-col md:max-w-[800px]">
            {...notices.list.map((notice : any) => (
              <React.Fragment key={notice.id}>
                <Zabo key={notice.id} {...notice} />
                <div className="my-[30px] h-[1px] bg-greyLight dark:bg-d_greyBorder" />
              </React.Fragment>
            ))}
          </div>
          {/* <Pagination
            page={page}
            items={notices.total}
            itemsPerPage={ITEMS_PER_PAGE}
          /> */}
        </>
      ) : (
        <div className="flex w-full justify-center">
          <div className="align-center flex flex-col justify-center">
            <div className="h-[100px]" />
            <div className="mx-auto h-[10px]" />

            <SearchNoResult />

            <p className="font-lg md:font-2xl pt-5 text-center font-bold text-secondaryText">
              {"emptyNotices"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorizedNotices;
