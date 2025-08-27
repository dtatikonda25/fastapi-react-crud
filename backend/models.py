from sqlalchemy import Column, Integer, String
from backend.database import Base  # if running inside /backend: from database import Base

class Book(Base):
    __tablename__ = "books"  # uses your existing MySQL table

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)




