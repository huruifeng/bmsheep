import subprocess
import os
from datetime import datetime
import pytz
import json

from functions.utils import zip_files

tz = pytz.timezone("Asia/Shanghai")

def run_varidnt(work_dir,vcf_file):
    print("Running job:", work_dir)
    job_info = json.load(open(f"{work_dir}/job_info.json"))
    try:
        cmd_str = " ".join(["python", "jobs/test.py"])
        subprocess.run(cmd_str, shell=True)

        job_info["end_time"] = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
        job_info["status"] = "Done"

    except Exception as e:
        job_info["status"] = "Error"
        job_info["error"] = str(e)
        job_info["end_time"] = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")

    with open(f"{work_dir}/job_info.json", "w") as outfile:
        json.dump(job_info, outfile)

    files = [f"{work_dir}/{f_i}" for f_i in os.listdir(work_dir) if f_i.startswith(f"out.{vcf_file}.SNP")]
    zip_filename = f"{work_dir}/results.zip"
    zip_files(zip_filename, files)

    return "OK"

def run_chipdesignvcf(work_dir,vcf_file):
    print("Running job:", work_dir)
    for i in range(10000000):
        print(i)
    return "OK"

def run_chipdesignpop(work_dir,vcf_file):
    print("Running job:", work_dir)
    for i in range(10000000):
        print(i)
    return "OK"
