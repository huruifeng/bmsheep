from typing import Annotated
from sqlmodel import Session, SQLModel
from sqlmodel import create_engine
from fastapi import Depends

from models import User, Job

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=False)

def create_db_and_tables():
    ## Create database and tables only if they don't exist
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]