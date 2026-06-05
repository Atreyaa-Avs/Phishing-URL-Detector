# Phishing URL Detector

### Chrome Extension + Python Backend to detect phishing links.

---

## About The Project

This project is a comprehensive Phishing URL Detection tool that leverages a machine learning model running on a Python backend, accessible via a Chrome extension. When a user checks a URL, the system predicts whether the website is legitimate or a phishing attempt.

### Functionality & Algorithms

The detection is powered by a **Gradient Boosting Classifier (GBC)** exported to ONNX format for fast inference. The prediction pipeline consists of:

1. **Feature Extraction**: The backend takes a URL and extracts **30 distinct features** using lexical analysis, DOM parsing, and third-party lookups. Features include:
   - URL-based properties (IP usage, URL length, presence of `@` symbol, shortening services, etc.)
   - Webpage content (iFrames, right-click disabling, pop-ups, forms)
   - External services (Domain age via WHOIS, Google indexing, PageRank)
2. **Model Inference**: The extracted 30 features are fed into the `gbc_model.onnx` model, which computes a probability score and classifies the site as either a "Safe Website" or "Phishing Website".

#### After training, the model was exported to ONNX format (`gbc_model.onnx`) to ensure fast and lightweight inference in the backend.

### Project Structure & Key Files

- **`wxt/`**: Contains the frontend Chrome Extension code built with the WXT framework.
- **`backend/main.py`**: The FastAPI application that provides REST endpoints (`/predict` and `/preview`) to interact with the model and fetch webpage metadata.
- **`backend/feature.py`**: The core feature extraction module that analyzes the target URL using `BeautifulSoup`, `whois`, and `requests`.
- **`backend/gbc_model.onnx`**: The pre-trained Gradient Boosting model optimized for ONNX Runtime.
- **`model/Copy_of_Phishingproject.ipynb`**: The Jupyter Notebook used for dataset processing and training the machine learning model.

---

## Backend Setup (Python 3.11 + ONNX)

1. **Navigate to backend folder:**

```powershell
cd backend
```

2. **Create virtual environment with Python 3.11:**

If uv is not installed run:
### Install uv
```powershell
pip install uv
```

### Create venv
```powershell
uv venv --python 3.11
```

### Activate venv
```powershell
.venv\Scripts\activate (Windows)
```

3. **Install dependencies:**

```powershell
uv pip install -r requirements.txt
```

> Make sure `requirements.txt` includes:

```
fastapi==0.110.0
uvicorn[standard]==0.29.0
pydantic==2.6.4
numpy==1.24.2
requests==2.31.0
beautifulsoup4==4.12.3
python-whois
python-dateutil
googlesearch-python
scikit-learn==1.3.2
scipy>=1.11.1
onnxruntime>=1.16.1
onnx==1.15.0

```

4. **Run the backend server:**

```powershell
uv run main.py
```

Your ONNX model (`gbc_model.onnx`) should load without errors.

---

## Frontend Setup (Chrome Extension) (Uses WXT Framework)

1. **Navigate to wxt folder:**

```powershell
cd wxt
```

2. **Install dependencies:**

```powershell
npm install
```

3. **Run development server:**

```powershell
npm run dev
```

After running this it should automatically open the browser with the extension installed already.

---

Now your **backend server** is running on Python 3.11 and the **frontend Chrome extension** is ready to detect phishing URLs.
