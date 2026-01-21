from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import uvicorn
from feature import FeatureExtraction
import numpy as np

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

# Load model ONCE
gbc = pickle.load(open("./gbc_model.pkl","rb"))

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
    uvicorn.run("main:app",host="0.0.0.0",port=3000,reload=True)