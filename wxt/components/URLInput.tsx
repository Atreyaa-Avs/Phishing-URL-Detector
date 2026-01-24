import { useState } from "react";
import GlowingInput from "./ui/GlowingInput";
import { APIResponse } from "@/types/Response";

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
      setResult({label: "Error contacting server", confidence: 0});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <p className="font-medium text-lg text-left mb-2">Enter URL:</p>

      <div className="flex gap-2 items-center">
        <GlowingInput
          setUrl={setUrl}
          onEnter={() => handleSubmit(url)}
        />

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
      {loading && <p className="my-1 text-sm text-gray-400 break-all">{url}</p>}

      <p>{result?.label}</p>
      <p>{result?.confidence}</p>
    </div>
  );
};

export default URLInput;

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);
