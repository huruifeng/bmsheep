import os
import json

from fastapi import APIRouter
from fastapi import Request, File, UploadFile, Form
from fastapi.responses import JSONResponse

from functions.run_script import run_varidnt

router = APIRouter()

# Directory to save jobs
JOB_DIR = "jobs"

@router.get("/hi/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@router.post("/upload_file")
async def upload_file(
        job_id: str = Form(...),
        input_vcf: UploadFile = File(...)
):
    print(f"Job ID: {job_id}")
    print(f"Uploaded File Name: {input_vcf.filename}")

    try:
        # Define the working directory
        work_dir = os.path.join(JOB_DIR, job_id)
        if not os.path.exists(work_dir):
            os.makedirs(work_dir)

        # Save the file to the directory
        file_path = os.path.join(work_dir, input_vcf.filename)
        with open(file_path, "wb") as f:
            content = await input_vcf.read()
            f.write(content)

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
        return JSONResponse(content={"success": False, "message": f"Error uploading file: {str(e)}"}, status_code=500)



@router.post("/varident")
async def process_varident(job_id: str = Form(...), input_vcf: str = Form(...)):
    print(f"Job ID: {job_id}, vcf file name: {input_vcf}")
    try:

        # Define the working directory
        work_dir = os.path.join(JOB_DIR, job_id)
        if not os.path.exists(work_dir):
            os.makedirs(work_dir)
        input_vcf = os.path.join(work_dir, input_vcf)

        # Process the file
        run_varidnt(work_dir,input_vcf)

        # Return success response
        return JSONResponse(
            content={
                "success": True,
                "message": "Job run successfully",
                "job_id": job_id,
            },
            status_code=200,
        )
    except Exception as e:
        # Handle errors
        return JSONResponse(
            content={"success": False, "message": f"Error running job: {str(e)}"},
            status_code=500,
        )

@router.post("/check_jobs")
async def check_jobs_post(request:Request):
    data = await request.json()
    user = data.get("username")

    jobs = []
    ## Add your job checking logic here
    job_dir = 'jobs'
    for job_id in os.listdir(job_dir):
        if job_id.startswith('JOB'):
            job_info_path = os.path.join(job_dir, job_id, "job_info.json")
            job_info = json.load(open(job_info_path))
            jobs.append(job_info)
        else:
            continue
    return {"success": True, "message": "Job checked successfully", "jobs": jobs}