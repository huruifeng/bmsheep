import subprocess
import os

def run_varidnt(work_dir,vcf_file):
    print("Running job:", work_dir)
    subprocess.run(["python", "jobs/test.py", work_dir, vcf_file])
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
