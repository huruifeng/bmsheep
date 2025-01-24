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
        example_cmd = (
            "perl /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/script/population_structure_analysis.pl "
            "-i test_geno.vcf "
            "-b /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/population_analysis/Frequency_across_population "
            "-o out.test"
        )

        cmd_str = (
            f"perl /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/script/population_structure_analysis.pl "
            f"-i {work_dir}/{vcf_file} "
            f"-b /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/population_analysis/Frequency_across_population "
            f"-o {work_dir}/out.{vcf_file}")

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

def run_genimpute(work_dir,vcf_file):
    print("Running job:", work_dir)
    job_info = json.load(open(f"{work_dir}/job_info.json"))
    try:
        cmd_str = " ".join(["python", "jobs/test.py"])
        example_cmd = ("perl /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/genotype_imputation/genotype_imputation.pl "
         "-i test.geno.vcf "
         "-b /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/genotype_imputation/Background_SNPs "
         "-o out.test")

        cmd_str = (
            f"perl /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/genotype_imputation/genotype_imputation.pl "
            f"-i {work_dir}/{vcf_file} "
            f"-b /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/genotype_imputation/Background_SNPs "
            f"-o {work_dir}/out.{vcf_file}")
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

def run_chipdesignvcf(work_dir,vcf_file,n_snp):
    print("Running job:", work_dir)
    job_info = json.load(open(f"{work_dir}/job_info.json"))
    try:
        cmd_str = " ".join(["python", "jobs/test.py"])
        cmd_str = (
            f"perl /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/design_variety_specific_SNPs/design_SNPs_user_submit.pl "
            f"-i {work_dir}/{vcf_file} "
            f"-b /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/design_variety_specific_SNPs/Frequency_across_population "
            f"-n {n_snp} "
            f"-o {work_dir}/out.{vcf_file}.SNP")
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

def run_chipdesignpop(work_dir,population,n_snp):
    print("Running job:", work_dir)
    job_info = json.load(open(f"{work_dir}/job_info.json"))
    try:
        cmd_str = " ".join(["python", "jobs/test.py"])
        cmd_str = (
            f"perl /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/design_variety_specific_SNPs/design_SNPs_user_select_population.pl "
            f"-p {population} "
            f"-b /mnt/chulaoshi/design_chip/variaty_identification/add_phase2/web_design/design_variety_specific_SNPs/Frequency_across_population "
            f"-n {n_snp} "
            f"-o {work_dir}/out.{population}")
        subprocess.run(cmd_str, shell=True)

        job_info["end_time"] = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
        job_info["status"] = "Done"

    except Exception as e:
        job_info["status"] = "Error"
        job_info["error"] = str(e)
        job_info["end_time"] = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")

    with open(f"{work_dir}/job_info.json", "w") as outfile:
        json.dump(job_info, outfile)

    files = [f"{work_dir}/{f_i}" for f_i in os.listdir(work_dir) if f_i.startswith(f"out.{population}.SNP")]
    zip_filename = f"{work_dir}/results.zip"
    zip_files(zip_filename, files)

    return "OK"
