import { useState } from "react";
import GlowingInput from "./ui/GlowingInput";
import { APIResponse } from "@/types/Response";
import Loader from "./ui/Loader";
import AcceptSvg from "@/assets/accept.svg";
import RejectSvg from "@/assets/reject.svg";
import VisitButton from "./actions/VisitButton";
import CopyButton from "./actions/CopyButton";
import ScanButton from "./actions/ScanButton";
import WhySafe from "./actions/WhySafe";
import ReportButton from "./actions/ReportButton";
import PreviewButton from "./actions/PreviewButton";
import ResetButton from "./actions/ResetButton";

const URLInput = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (url: string) => {
    if (loading || !url.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("http://127.0.0.1:3000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data: APIResponse = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ label: "Error contacting server", confidence: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <p className="font-medium text-lg text-left mb-2">Enter URL:</p>

      <div className="flex gap-2 items-center">
        <GlowingInput url={url} setUrl={setUrl} onEnter={() => handleSubmit(url)} />

        <button
          onClick={() => handleSubmit(url)}
          disabled={loading}
          className={`px-4 py-2 rounded-md font-medium flex items-center justify-center
            ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 cursor-pointer"
            } text-white`}
        >
          {loading ? <Spinner /> : "Check"}
        </button>
      </div>

      {/* Debug / Output */}
      {loading && (
        <div className="flex flex-col gap-3 pb-2 w-full">
          <p className="my-1 text-sm text-gray-400 break-all">{url}</p>
          <Loader />
        </div>
      )}

      {result && (
        <div>
          <p className="my-1 text-sm text-gray-400 break-all text-center">
            {url}
          </p>
          <div className="flex w-full text-left justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
            <div>
              <p
                className={`text-2xl font-bold ${
                  result?.label === "Safe Website"
                    ? "text-green-600"
                    : "text-red-600"
                } mb-1`}
              >
                {result?.label}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-bold">Confidence:</span>{" "}
                {result?.confidence}%
              </p>
            </div>
            <div>
              {result.label === "Safe Website" ? (
                <img src={AcceptSvg} alt="Accept" className="w-12 h-12" />
              ) : (
                <img src={RejectSvg} alt="Reject" className="w-12 h-12" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Safe Actions */}
            {result.label === "Safe Website" && (
              <>
                <VisitButton url={url} />
                <CopyButton url={url} />
              </>
            )}

            {/* Universal Actions */}
            <ScanButton url={url} />

            {result.label === "Safe Website" && <WhySafe />}

            {result.label === "Safe Website" && <PreviewButton />}

            <ReportButton />

            <div className="col-span-2">
              <ResetButton
                onReset={() => {
                  setUrl("");
                  setResult(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLInput;

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);
