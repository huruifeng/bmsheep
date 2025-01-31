import uuid
from datetime import datetime

from pydantic import EmailStr
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import pytz

tz = pytz.timezone("Asia/Shanghai")

class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    institution: Optional[str] = Field(default=None)
    full_name: Optional[str] = Field(default=None)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    jobs: list["Job"] = Relationship(back_populates="owner", cascade_delete=True)

    register_time: datetime = Field(default_factory=lambda: datetime.now(tz), index=True)
    last_login_time: datetime = Field(default_factory=lambda: datetime.now(tz), index=True)

    is_admin: bool = Field(default=False)

    # Verification
    is_verified: bool = Field(default=False)
    verification_code: Optional[str] = Field(default=None)
    verification_code_expiration: datetime = Field(default_factory=lambda: datetime.now(tz), index=True)

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)

# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr|None = None
    institution: Optional[str] | None = None

    is_admin: bool | None = None

    # Verification
    is_verified: bool | None = None
    verification_code: Optional[str] | None = None
    verification_code_expiration: datetime | None = None

class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class JobBase(SQLModel):
    job_id: str | None = Field(default=None, max_length=255)
    job_type: str | None = Field(default=None, max_length=255)
    status: str | None = Field(default=None, max_length=255)
    error: str | None = Field(default=None, max_length=255)
    start_time: datetime | None = Field(default_factory=lambda: datetime.now(tz), index=True)
    end_time: datetime | None = Field(default_factory=lambda: datetime.now(tz), index=True)

# Database model, database table inferred from class name
class Job(JobBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    owner: User | None = Relationship(back_populates="jobs")

# Properties to receive on item creation
class JobCreate(JobBase):
    pass

# Properties to receive on item update
class JobUpdate(JobBase):
    status: str | None = None
    error: str | None = None
    start_time: datetime | None = None
    end_time: datetime | None = None

# Properties to return via API, id is always required
class JobPublic(JobBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class JobsPublic(SQLModel):
    data: list[JobPublic]
    count: int
