from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import Base, engine   # or: from database import Base, engine
from backend.crud import router as books_router

app = FastAPI(title="Books CRUD API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)  # won't drop your table, just ensures mappings

@app.get("/")
def root():
    return {"message": "Welcome to the Books API"}

app.include_router(books_router, prefix="/books")


