import json
import os
import zipfile

def zip_files(zip_filename, files_to_zip):
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in files_to_zip:
            # Strip the parent folder paths, only include the file name
            zipf.write(file, arcname=file.split("/")[-1])
    print(f"Created zip file: {zip_filename}")