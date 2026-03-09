from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Expense
from schemas import ExpenseCreate, ExpenseResponse


router = APIRouter()


@router.post("/expenses", response_model=ExpenseResponse,tags=["create Expense"])
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    new_expense = Expense(**expense.model_dump())
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense