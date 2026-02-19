from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import onnxruntime as ort
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from feature import FeatureExtraction


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# Request / Response Models
# ==============================

class UrlRequest(BaseModel):
    url: str


class PreviewResponse(BaseModel):
    title: str | None
    favicon: str | None


# ==============================
# Load ONNX Model ONCE
# ==============================

session = ort.InferenceSession("gbc_model.onnx")

input_name = session.get_inputs()[0].name
output_names = [output.name for output in session.get_outputs()]


# ==============================
# Root Endpoint
# ==============================

@app.get("/")
def root():
    return {"message": "API is running."}


# ==============================
# Preview Endpoint
# ==============================

@app.post("/preview", response_model=PreviewResponse)
def preview(req: UrlRequest):
    try:
        headers = {"User-Agent": "Mozilla/5.0 (LinkPreviewBot)"}

        res = requests.get(req.url, headers=headers, timeout=5)
        res.raise_for_status()

        soup = BeautifulSoup(res.text, "html.parser")

        title = soup.title.string.strip() if soup.title else ""

        icon_link = soup.find("link", rel=lambda x: x and "icon" in x.lower())

        favicon = (
            urljoin(req.url, icon_link["href"])
            if icon_link and icon_link.get("href")
            else urljoin(req.url, "/favicon.ico")
        )

        return {
            "title": title,
            "favicon": favicon
        }

    except Exception:
        return {
            "title": "",
            "favicon": ""
        }


# ==============================
# Predict Endpoint (ONNX)
# ==============================

@app.post("/predict")
def predict(req: UrlRequest):

    # Extract features
    obj = FeatureExtraction(req.url)
    x = np.array(obj.getFeaturesList(), dtype=np.float32).reshape(1, 30)

    # Run inference
    outputs = session.run(None, {input_name: x})

    # Depending on model export, ONNX usually returns:
    # outputs[0] -> label
    # outputs[1] -> probabilities

    if len(outputs) == 2:
        pred = outputs[0][0]
        proba = outputs[1][0]
    else:
        # fallback (some exports only return probabilities)
        proba = outputs[0][0]
        pred = int(np.argmax(proba))

    confidence = float(max(proba)) * 100

    return {
        "label": "Safe Website" if pred == 1 else "Phishing Website",
        "confidence": round(confidence, 2)
    }


# ==============================
# Run Server
# ==============================

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)
