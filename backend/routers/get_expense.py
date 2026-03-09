from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Expense
from schemas import ExpenseResponse

router = APIRouter()

@router.get("/expenses", response_model=List[ExpenseResponse],tags=["Get Expense"])
def get_expenses(
    category: Optional[str] = Query(None),
    sort:Optional[str] =Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Expense).filter(Expense.is_deleted == False)

    if category:
        query = query.filter(Expense.category == category)

    if sort=="asc":
        query= query.order_by(Expense.amount.asc())
    elif sort == "desc":
        query= query.order_by(Expense.amount.desc())

    elif sort == "recent":
        query=query.order_by(Expense.date.desc())
    elif sort=="old":
        query=query.order_by(Expense.date.asc())
    return query.all()
