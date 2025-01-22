from fastapi import APIRouter
from fastapi.responses import JSONResponse

from fastapi import File, UploadFile, Form

import os

from functions.run_script import run_varidnt

router = APIRouter()

# Directory to save jobs
JOB_DIR = "jobs"

@router.get("/hi/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@router.post("/varident")
async def process_varident(
    job_id: str = Form(...),
    input_vcf: UploadFile = File(...),
):
    print(f"Job ID: {job_id}")
    print(f"Uploaded File Name: {input_vcf.filename}")

    try:
        # Define the working directory
        work_dir = os.path.join(JOB_DIR, "varident", job_id)
        if not os.path.exists(work_dir):
            os.makedirs(work_dir)

        # Save the file to the directory
        file_path = os.path.join(work_dir, input_vcf.filename)
        with open(file_path, "wb") as f:  # Open in binary mode
            content = await input_vcf.read()
            f.write(content)

        # Process the file
        run_varidnt(work_dir,file_path)


        # Return success response
        return JSONResponse(
            content={
                "success": True,
                "message": "File uploaded successfully",
                "job_id": job_id,
            },
            status_code=200,
        )
    except Exception as e:
        # Handle errors
        return JSONResponse(
            content={"success": False, "message": f"Error uploading file: {str(e)}"},
            status_code=500,
        )


