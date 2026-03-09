from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Expense
from schemas import ExpenseUpdate, ExpenseResponse

router = APIRouter()

@router.put("/expenses/{expense_id}", response_model=ExpenseResponse,tags=["Update Expense"])
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    db: Session = Depends(get_db)
):
    db_expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.is_deleted == False
    ).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    for key, value in expense.model_dump(exclude_unset=True).items():
        setattr(db_expense, key, value)

    db.commit()
    db.refresh(db_expense)
    return db_expense
