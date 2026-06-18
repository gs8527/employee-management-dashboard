from sqlalchemy.orm import Session
import models
import schemas

def get_employees(db: Session):
    return db.query(models.Employee).all()

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: int):
    emp = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if emp:
        db.delete(emp)
        db.commit()

    return emp

def update_employee(
    db: Session,
    employee_id: int,
    employee: schemas.EmployeeCreate
):
    emp = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if emp:
        emp.name = employee.name
        emp.email = employee.email
        emp.role = employee.role

        db.commit()
        db.refresh(emp)

    return emp