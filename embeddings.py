import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

def get_embedding_model(model_name: str = "models/gemini-embedding-001"):
    """
    Returns GoogleGenerativeAIEmbeddings using GOOGLE_API_KEY (Google Free API).
    Uses 'models/gemini-embedding-001' by default.
    """
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

    if not api_key or api_key.strip() == "" or api_key == "your_google_api_key_here":
        raise ValueError(
            "GOOGLE_API_KEY is missing or invalid! "
            "Please configure GOOGLE_API_KEY in your .env file."
        )

    return GoogleGenerativeAIEmbeddings(
        model=model_name,
        google_api_key=api_key
    )

