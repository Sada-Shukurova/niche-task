import { useEffect, useState } from "react";
import axios from "axios";
import type { INotice, INoticeTotal } from "../../assets/types";
import { useSearchParams } from "react-router-dom";

const MyTable: React.FC = () => {
  const [data, setData] = useState<INotice[]>([]);
  const [allPages, setAllPages] = useState<number>(1);
  const [sorted, setSorted] = useState<keyof INotice | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || "1");

  useEffect(() => {
    getData(String(page)).catch(console.error);
  }, [page]);

  const getData = async (page: string) => {
    try {
      const resp = await axios.get<INoticeTotal>(
        `/data/notices_page${page}.json`
      );
      const lastPage = +(
        resp.data["hydra:view"]?.["hydra:last"]?.split("=")[1] ?? "1"
      );

      setAllPages(lastPage);
      const people = resp.data["hydra:member"] ?? [];
      setData(people);
    } catch (error) {
      console.log("Cannot get data", error);
    }
  };
  // sort
  const sortFunc = (key: keyof INotice) => {
    let myOrder: "asc" | "desc" = "asc";
    if (sorted === key) {
      myOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSorted(key);
    setSortOrder(myOrder);
  };
  // filtering
  const filteredNotices = (data || [])
    .filter((notice) => {
      return statusFilter ? notice.status.includes(statusFilter) : true;
    })
    .sort((a, b) => {
      if (!sorted) return 0;
      const aVal = a[sorted];
      const bVal = b[sorted];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  return (
    <div className="mt-20">
      <div className="flex justify-end mb-20">
        <select
          value={statusFilter}
          className="select select-primary"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option className="bg-primary text-primary-content" value="">
            Status
          </option>
          <option className="bg-primary text-primary-content" value={"active"}>
            Active
          </option>
          <option
            className="bg-primary text-primary-content"
            value={"archived"}
          >
            Archived
          </option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-box  shadow-[0_0_15px_rgba(0,0,0,0.25)] shadow-primary-content/60  bg-accent/20">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th
                title="Click to Sort"
                className="cursor-pointer p-3.5 bg-base-300 text-center font-black"
              >
                <span className="block" onClick={() => sortFunc("id")}>
                  ID
                </span>
                <label className="input w-1/2 mx-auto mt-2">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input type="search" required placeholder="Search" />
                </label>
              </th>
              <th
                title="Click to Sort"
                className="cursor-pointer p-3.5 bg-base-300 text-center font-black"
              >
                <span onClick={() => sortFunc("title")} className="block">
                  Title
                </span>
                <label className="input w-1/2 mx-auto mt-2">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input type="search" required placeholder="Search" />
                </label>
              </th>
              <th
                title="Click to Sort"
                className="cursor-pointer p-3.5 bg-base-300 text-center font-black"
              >
                <span className="block" onClick={() => sortFunc("status")}>
                  Status
                </span>
                <label className="input w-1/2 mx-auto mt-2">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input type="search" required placeholder="Search" />
                </label>
              </th>
              <th
                title="Click to Sort"
                className="cursor-pointer p-3.5 bg-base-300 text-center font-black"
              >
                <span onClick={() => sortFunc("createdAt")} className="block">
                  Created At
                </span>
                <label className="input w-1/2 mx-auto mt-2">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input type="search" required placeholder="Search" />
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((notice) => {
              return (
                <tr key={notice.id}>
                  <th className="text-center">{notice.id}</th>
                  <td className="text-center">{notice.title}</td>
                  <td className="text-center">
                    <p
                      className={`${
                        notice.status === "active"
                          ? "bg-secondary"
                          : "bg-primary-content"
                      } py-1.5 rounded-full`}
                    >
                      {notice.status}
                    </p>
                  </td>
                  <td className="text-center">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-20">
        <div className="join ">
          <button
            className="join-item btn btn-secondary"
            onClick={() => {
              if (page > 1) {
                const newPage = page - 1;
                const newParams = new URLSearchParams(params);
                newParams.set("page", String(newPage));
                setParams({ page: String(newPage) });
              }
            }}
            disabled={page === 1}
          >
            ◀
          </button>
          {Array.from({ length: allPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`join-item btn btn-secondary ${
                page === i + 1 ? "bg-accent-content text-primary" : ""
              }`}
              onClick={() => {
                const newParams = new URLSearchParams(params);
                newParams.set("page", String(i + 1));
                setParams({ page: String(i + 1) });
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="join-item btn btn-secondary"
            onClick={() => {
              if (page < allPages) {
                const newPage = page + 1;
                const newParams = new URLSearchParams(params);
                newParams.set("page", String(newPage));
                setParams({ page: String(newPage) });
              }
            }}
            disabled={page === allPages}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTable;
