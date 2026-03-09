from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from database import Base
from datetime import datetime


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String(50), nullable=False)
    notes = Column(String(250), nullable=True)
    date = Column(DateTime, default=datetime.now, nullable=False)
    is_deleted = Column(Boolean, default=False)
