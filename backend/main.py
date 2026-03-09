from fastapi import FastAPI
from database import Base, engine
from routers import (create_expense,delete_expense,get_expense,update_expense)

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Expense Tracker API",
    description="Your daily expense tracker !!!",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Create database tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(create_expense.router)
app.include_router(get_expense.router)
app.include_router(update_expense.router)
app.include_router(delete_expense.router)
