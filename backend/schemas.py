from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ExpenseBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    amount: float = Field(..., gt=0)
    category: str = Field(..., min_length=3, max_length=50)
    notes: Optional[str] = Field(None, max_length=250)
    date: datetime


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=100)
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[str] = Field(None, min_length=3, max_length=50)
    notes: Optional[str] = Field(None, max_length=250)
    date: datetime


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    notes: Optional[str] = None
    date: datetime 

    model_config = {
        "from_attributes": True
    }
