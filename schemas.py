from pydantic import BaseModel

class EmployeeBase(BaseModel):
    name: str
    email: str
    role: str
    photo: str | None = None

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True