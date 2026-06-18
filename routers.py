from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import crud
import schemas
import database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/employees")
def read_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@router.post("/employees")
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)

@router.delete("/employees/{emp_id}")
def remove_employee(emp_id: int, db: Session = Depends(get_db)):
    return crud.delete_employee(db, emp_id)

@router.put("/employees/{emp_id}")
def update_employee(
    emp_id: int,
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    return crud.update_employee(db, emp_id, employee)