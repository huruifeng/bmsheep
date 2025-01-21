from fastapi import APIRouter
from fastapi.responses import JSONResponse

from fastapi import File, UploadFile, Form

import os

router = APIRouter()

# Directory to save jobs
JOB_DIR = "/jobs"

@router.get("/hi/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@router.post("/varident")
async def upload_varident_file(
    job_id: str = Form(...),
    input_vcf: UploadFile = File(...),
):
    try:
        work_dir = os.path.join(JOB_DIR,"varident" ,job_id)
        if not os.path.exists(work_dir):
            os.makedirs(work_dir)

        # Save the file to the directory
        file_path = os.path.join(work_dir, input_vcf.filename)
        with open(file_path, "w") as f:
            content = await input_vcf.read()
            f.write(content)

        return JSONResponse(
            content={
                "success": True,
                "message": "File uploaded successfully",
                "job_id": job_id,
            },
            status_code=200,
        )
    except Exception as e:
        return JSONResponse(
            content={"success": False,"message": f"Error uploading file: {str(e)}"}, status_code=500
        )