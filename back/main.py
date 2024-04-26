# main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os

app = FastAPI()

# Define the origins that should be allowed to make requests to the API
# from environments variable : 'ALLOWED_ORIGINS'
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost").split(",")

# Define the upload folder
# from environments variable : 'UPLOAD_FOLDER'
upload_folder = os.getenv("UPLOAD_FOLDER")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.post("/files/")
async def create_upload_file(file: UploadFile = File(...)):
    # check that the file is a valid image (jpg or png)
    if file.content_type not in ["image/jpeg", "image/jpg" , "image/png"]:
        return {"error": "Only image files (jpg, jpeg, png) are allowed"}
    file_location = f"{upload_folder}/{file.filename}"
    # check if the file already exists
    if os.path.exists(file_location):
        return {"error": "File with the same name already exists"}
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return {"info": f"file '{file.filename}' successfully uploaded"}

@app.get("/files/")
async def get_files():
    files = os.listdir(upload_folder)
    return {"files": files}


