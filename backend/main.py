from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import create_db_and_tables
from routers import API,auth,user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Update with your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(API.router, prefix="/api", tags=["APIs"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/user", tags=["user"])

app.add_event_handler("startup", create_db_and_tables)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# Run FastAPI with uvicorn and --reload: When you run the application using uvicorn, include the --reload flag:
# uvicorn main:app --reload
# --main is the name of your Python file (without the .py extension).
# --app is the name of your FastAPI instance.

# Example Command: If your FastAPI application is in a file named app.py:
# uvicorn main:app --host 0.0.0.0 --port 3000 --reload
# --host 0.0.0.0: Makes the app accessible on your local network.
# --port 3000: Specifies the port number (adjust to your needs).
# --reload: Enables automatic reload when files are modified.


# For production deployments we recommend using gunicorn with the uvicorn worker class.
# gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker

# This starts 4 workers, each capable of handling 2 threads, increasing capacity for concurrent requests.
# gunicorn -w 4 --threads 2 -k uvicorn.workers.UvicornWorker main:app