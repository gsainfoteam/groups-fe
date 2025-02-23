import React from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import Zabo from "../zabo/Zabo";
import { ex_data } from "./example";
import { Notice } from "@/types/interfaces";
import SearchNoResult from "@/assets/icons/search-no-result.svg?react";
import Loading from "../loading/Loading";
import Error from "@/assets/error/Error";
import ziggleapi from "@/apis/ziggle";
const API_ZIGGLE = import.meta.env.VITE_ZIGGLE_API;

interface Notices {
  list: Notice[];
  page: number;
}

const ITEMS_PER_PAGE = 30;
const fetcher = async (url: string) => {
  return ziggleapi.get(url, { withCredentials: true }).then(({ data }) => data);
};
const CategorizedNotices = ({ uuid }: { uuid: undefined | string }) => {
  const { t } = useTranslation();
  const {
    data: notices,
    error,
    isLoading,
  } = useSWR<Notices>(
    `${API_ZIGGLE}notice?offset=10&limit=${ITEMS_PER_PAGE}&lang=kr&order-by=recent&my=own&group-id=${uuid}`,
    fetcher,
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center">
        <Error>{"Fail to find group notices"}</Error>
      </div>
    );
  }
  if (!notices) {
    return (
      <div className="flex flex-col items-center">
        <Error>{"There is no notices"}</Error>
      </div>
    );
  }

  return (
    <>
      {notices.list.length ? (
        <>
          <div className="flex w-full flex-col md:max-w-[800px]">
            {...notices.list.map((notice: Notice) => (
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
              {t("group.emptyNotices")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorizedNotices;
