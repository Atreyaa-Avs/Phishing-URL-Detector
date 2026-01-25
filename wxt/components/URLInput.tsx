import { useState } from "react";
import GlowingInput from "./ui/GlowingInput";
import { APIResponse } from "@/types/Response";
import Loader from "./ui/Loader";
import AcceptSvg from "@/assets/accept.svg";
import RejectSvg from "@/assets/reject.svg";
import RedirectSvg from "@/assets/redirect.svg";

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
        <GlowingInput setUrl={setUrl} onEnter={() => handleSubmit(url)} />

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
          <div className="flex pb-2 w-full text-left justify-between items-center">
            <div>
              <p className="text-lg font-bold">{result?.label}</p>
              <p className="text-lg">
                <span className="font-bold">Confidence:</span>{" "}
                {result?.confidence}%
              </p>
            </div>
            <div>
              {result.label === "Safe Website" ? (
                <img
                  src={AcceptSvg}
                  alt="Accept"
                  style={{ width: "50px", height: "50px" }}
                />
              ) : (
                <img
                  src={RejectSvg}
                  alt="Reject"
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </div>
          </div>
          {result.label === "Safe Website" && (
            <button
              onClick={() =>
                window.open(
                  url.startsWith("http") ? url : `https://${url}`,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="flex justify-center items-center gap-2 mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition hover:cursor-pointer"
            >
              <span className="text-base">Visit Website{" "}</span>
              <img
                src={RedirectSvg}
                alt="Redirect"
                className="size-5 fill-white"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default URLInput;

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);
