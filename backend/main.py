from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import uvicorn
from feature import FeatureExtraction
import numpy as np
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your extension domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UrlRequest(BaseModel):
    url: str

class PreviewResponse(BaseModel):
    title: str | None
    favicon: str | None

# Load model ONCE
gbc = pickle.load(open("./gbc_model.pkl","rb"))

@app.get("/")
def root():
    return {
        "message": "API is running."
    }

@app.post("/preview", response_model=PreviewResponse)
def preview(req: UrlRequest):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (LinkPreviewBot)"
        }

        res = requests.get(req.url, headers=headers, timeout=5)
        res.raise_for_status()

        soup = BeautifulSoup(res.text, "html.parser")

        title = soup.title.string if soup.title else ""

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
    except Exception as e:
        return {
            "title": "",
            "favicon": ""
        }

@app.post("/predict")
def predict(req: UrlRequest):
    obj = FeatureExtraction(req.url)
    x = np.array(obj.getFeaturesList()).reshape(1, 30)

    proba = gbc.predict_proba(x)[0]
    pred = gbc.predict(x)[0]

    return {
        "label": "Safe Website" if pred == 1 else "Phishing Website",
        "confidence": round(max(proba) * 100, 2)
    }

if __name__ == "__main__":
    uvicorn.run("main:app",port=3000,reload=True)