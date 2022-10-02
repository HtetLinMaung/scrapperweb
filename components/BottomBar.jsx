import { useContext } from "react";

import { appContext } from "../providers/AppProvider";
import scrapData from "../utils/scrap-data";

export default function BottomBar() {
  const [state, dispatch] = useContext(appContext);

  const previewData = async () => {
    const data = await scrapData({
      url: state.url,
      columns: state.columns,
      cache: true,
    });

    let headers = [];
    if (data.data && data.data.length) {
      headers = Object.keys(data.data[0]).map((key) => ({ key, title: key }));
    }
    console.log(headers);
    dispatch({
      type: "SET_STATE",
      payload: {
        items: data.data,
        headers,
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
    <div className="fixed bottom-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center justify-center">
            <div className="px-2">
              <button
                onClick={download}
                style={{ color: "#fff" }}
                className="btn btn-info btn-wide"
              >
                Download Data
              </button>
            </div>
            <div className="px-2">
              <label
                onClick={previewData}
                htmlFor="preview-modal"
                className="btn btn-info btn-outline btn-wide"
              >
                Preview
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
