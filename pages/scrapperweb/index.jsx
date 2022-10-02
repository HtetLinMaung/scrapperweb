import { useContext, useState } from "react";
import Table from "../../components/Table";
import { appContext } from "../../providers/AppProvider";
import scrapData from "../../utils/scrap-data";

export default function Home() {
  const [exportOptions, setExportOptions] = useState([
    {
      value: "csv",
      label: "CSV",
    },
    {
      value: "json",
      label: "JSON",
    },
    {
      value: "sql",
      label: "SQL",
    },
    {
      value: "xlsx",
      label: "Excel",
    },
  ]);
  const [state, dispatch] = useContext(appContext);

  const addColumn = () => {
    dispatch({
      type: "SET_STATE",
      payload: {
        columns: [
          ...state.columns,
          {
            name: "",
            selector: "",
            attr: "",
            fillna: "",
          },
        ],
      },
    });
  };

  const removeColumn = (index) => {
    const newColumns = [...state.columns];
    newColumns.splice(index, 1);
    dispatch({
      type: "SET_STATE",
      payload: {
        columns: newColumns,
      },
    });
  };

  const updateColumnField = (index, payload = {}) => {
    const newColumns = [...state.columns];
    newColumns[index] = { ...newColumns[index], ...payload };
    dispatch({
      type: "SET_STATE",
      payload: {
        columns: newColumns,
      },
    });
  };

  const download = async () => {
    const data = await scrapData({
      url: state.url,
      columns: state.columns,
      cache: true,
      exportas: state.exportas,
    });
    window.location.href = data.data;
  };

  return (
    <div className="mx-6 my-5 pb-20">
      <div className="mb-5 flex flex-wrap">
        <div className="md:w-2/5 w-full p-2">
          <input
            type="text"
            placeholder="Url"
            className="input w-full input-info"
            value={state.url}
            onChange={(e) =>
              dispatch({
                type: "SET_STATE",
                payload: {
                  url: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="mb-5">
        {state.columns.map((column, index) => (
          <div key={index} className="flex flex-wrap mb-2">
            <div className="w-1/5 p-2">
              <input
                name="name"
                value={column.name}
                onChange={(e) =>
                  updateColumnField(index, { [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="Field Name"
                className="input flex-grow w-full input-info"
              />
            </div>
            <div className="w-1/5 p-2">
              <input
                name="selector"
                value={column.selector}
                onChange={(e) =>
                  updateColumnField(index, { [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="CSS Selector"
                className="input flex-grow w-full input-info"
              />
            </div>
            <div className="w-1/5 p-2">
              <input
                name="attr"
                value={column.attr}
                onChange={(e) =>
                  updateColumnField(index, { [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="Attribute"
                className="input flex-grow w-full input-info"
              />
            </div>
            <div className="w-1/5 p-2">
              <input
                name="fillna"
                value={column.fillna}
                onChange={(e) =>
                  updateColumnField(index, { [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="Default"
                className="input flex-grow w-full input-info"
              />
            </div>
            <div className="w-1/5 p-2">
              <button
                onClick={() => removeColumn(index)}
                className="btn btn-error btn-circle btn-outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex">
        <div className="p-2 w-1/5">
          <button
            onClick={addColumn}
            className="btn btn-outline btn-info btn-block"
          >
            Add Another Field
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex mb-5">
        <div className="w-1/5 p-2">
          <select
            value={state.exporttype}
            onChange={(e) =>
              dispatch({
                type: "SET_STATE",
                payload: {
                  exporttype: e.target.value,
                  exportas: `scrap_data.${e.target.value}`,
                },
              })
            }
            className="select select-bordered w-full max-w-xs select-info"
          >
            {exportOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input type="checkbox" id="preview-modal" className="modal-toggle" />
      <label htmlFor="preview-modal" className="modal cursor-pointer">
        <label className="modal-box relative max-w-full p-0">
          <Table headers={state.headers} items={state.items} hideAction />
          <div className="sticky bottom-0 bg-white flex justify-center items-center">
            <div className="p-2">
              <label
                htmlFor="preview-modal"
                onClick={download}
                style={{ color: "#fff" }}
                className="btn btn-info btn-wide"
              >
                Download Data
              </label>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}
