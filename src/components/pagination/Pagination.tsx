"use client";

import { useCallback, useEffect } from "react";

import ArrowRightIcon from "@/assets/icons/arrow-right.svg?react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../button/Button";

interface PaginationProps {
  items: number;
  itemsPerPage: number;
  page: number;
}

const Pagination = ({ items, itemsPerPage, page }: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const generateLink = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const pages = Math.ceil(items / itemsPerPage);

  useEffect(() => {
    if (page < 0 || Number.isNaN(page))
      navigate(generateLink(0), { replace: true });

    if (page >= pages)
      navigate(generateLink(Math.max(pages - 1, 0)), { replace: true });
  }, [generateLink, page, pages]);

  if (pages === 0) return null;

  const startItem = page * itemsPerPage + 1;
  const endItem = Math.min((page + 1) * itemsPerPage, items);

  return (
    <div className="flex items-center">
      <div className="flex gap-1 p-2">
        <div className="text-xl font-semibold">{`${startItem}~${endItem}`}</div>
        <div className="text-xl">of</div>
        <div className="text-xl font-semibold">{items}</div>
      </div>
      <div className="flex gap-1">
        {page !== 0 ? (
          <Button animated>
            <Link to={generateLink(page - 1)}>
              <ArrowRightIcon className="w-6 rotate-180 fill-none stroke-text dark:stroke-dark_white md:w-7" />
            </Link>
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="w-6 rotate-180 fill-none stroke-grey dark:stroke-dark_grey md:w-7" />
          </Button>
        )}
        {page + 1 !== pages ? (
          <Button animated>
            <Link to={generateLink(page + 1)}>
              <ArrowRightIcon className="w-6 fill-none stroke-text dark:stroke-dark_white md:w-7" />
            </Link>
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="w-6 stroke-grey dark:stroke-dark_grey md:w-7" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
