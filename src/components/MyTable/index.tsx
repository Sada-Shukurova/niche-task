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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th
                title="Click to Sort"
                className="cursor-pointer"
                onClick={() => sortFunc("id")}
              >
                ID
              </th>
              <th
                title="Click to Sort"
                className="cursor-pointer"
                onClick={() => sortFunc("title")}
              >
                Title
              </th>
              <th
                title="Click to Sort"
                className="cursor-pointer"
                onClick={() => sortFunc("status")}
              >
                Status
              </th>
              <th
                title="Click to Sort"
                className="cursor-pointer"
                onClick={() => sortFunc("createdAt")}
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((notice) => {
              return (
                <tr key={notice.id}>
                  <th>{notice.id}</th>
                  <td>{notice.title}</td>
                  <td>{notice.status}</td>
                  <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-20">
        <div className="join ">
          {Array.from({ length: allPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
              onClick={() => {
                const newParams = new URLSearchParams(params);
                newParams.set("page", String(i + 1));
                setParams({ page: String(i + 1) });
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTable;
