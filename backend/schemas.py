from pydantic import BaseModel, EmailStr

class BookBase(BaseModel):
    name: str
    email: EmailStr

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    pass

class BookOut(BookBase):
    id: int
    class Config:
        orm_mode = True




