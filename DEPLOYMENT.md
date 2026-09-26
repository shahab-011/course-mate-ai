# 🚀 Production Deployment Guide

This project is fully production-ready for deployment on **Render** (Backend API) and **Netlify** (Frontend UI).

---

## 1. ⚙️ Deploy Backend to Render

1. Push your repository to GitHub / GitLab.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Select your repository.
4. Fill in the following details:
   - **Name**: `coursemate-rag-backend`
   - **Region**: Choose your preferred region (e.g. Singapore / Frankfurt / Oregon)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank for repository root)*
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`

5. **Environment Variables**:
   Add the following environment variables under **Advanced** → **Environment Variables**:
   - `GOOGLE_API_KEY`: `your_google_free_api_key`
   - `GROQ_API_KEY`: `your_groq_api_key`
   - `PYTHON_VERSION`: `3.11.9`

6. Click **Create Web Service**.
7. Copy your deployed backend URL (e.g. `https://coursemate-rag-backend.onrender.com`).

---

## 2. 🌐 Deploy Frontend to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/) and click **Add new site** → **Import an existing project**.
2. Select **GitHub** and choose your repository.
3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Expand **Environment variables** and add:
   - `VITE_API_URL`: `https://coursemate-rag-backend.onrender.com/api` *(replace with your actual Render URL)*

5. Click **Deploy site**.

---

## 🛠️ Production Configuration Summary
- **Backend Port Binding**: Handled via `$PORT` environment variable.
- **Frontend SPA Routing**: Handled via [`netlify.toml`](file:///c:/Users/Shahab%20Alam/Desktop/RAG/netlify.toml) and [`frontend/public/_redirects`](file:///c:/Users/Shahab%20Alam/Desktop/RAG/frontend/public/_redirects).
- **CORS Handling**: `api.py` permits cross-origin requests from Netlify.
- **5-Page PDF Validation**: Built-in safeguards prevent high memory usage on free hosting tiers.
