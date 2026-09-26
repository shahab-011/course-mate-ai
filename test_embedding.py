from pypdf import PdfReader
from embeddings import get_embedding_model

test_text = "Deep Learning is a subset of machine learning based on artificial neural networks."

print("=" * 60)
print(f"Test Text: {test_text}")
print("=" * 60)

# 2. Create embedding using Google Gemini Embeddings
embeddings_model = get_embedding_model()
vector = embeddings_model.embed_query(test_text)

print("\nGENERATED GOOGLE GEMINI EMBEDDING VECTOR:")
print("=" * 60)
print(f"Vector Dimensions: {len(vector)}")
print(f"\nSample Vector Values (first 10 values):\n{vector[:10]}...")
print("=" * 60)
