# Phishing URL Detector

### Chrome Extension + Python Backend to detect phishing links.

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

## Frontend Setup (Chrome Extension)

1. **Navigate to frontend folder:**

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
