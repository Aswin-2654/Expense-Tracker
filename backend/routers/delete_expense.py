from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Expense

router = APIRouter()

@router.delete("/expenses/{expense_id}",tags=["Delete Expense"])
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    db_expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.is_deleted == False
    ).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db_expense.is_deleted = True
    db.commit()
    return {"message": "Expense deleted successfully"}
