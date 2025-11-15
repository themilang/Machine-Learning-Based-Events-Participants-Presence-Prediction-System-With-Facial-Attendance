# import face_recognition
# import pickle
# import os

# dataset_path = os.path.join(os.path.dirname(__file__), "images")

# known_face_encodings = []
# known_face_names = []
# known_user_ids = []

# print("📸 Generating encodings from:", dataset_path)

# for i, filename in enumerate(os.listdir(dataset_path)):
#     if filename.lower().endswith((".jpg", ".jpeg", ".png")):
#         name = os.path.splitext(filename)[0]
#         image_path = os.path.join(dataset_path, filename)
#         image = face_recognition.load_image_file(image_path)
#         encodings = face_recognition.face_encodings(image)

#         if encodings:
#             known_face_encodings.append(encodings[0])
#             known_face_names.append(name)
#             known_user_ids.append(f"{i+1:04d}")
#             print(f"✅ Encoded {name} as ID {i+1:04d}")
#         else:
#             print(f"⚠️ No face found in {filename}")

# with open(os.path.join(os.path.dirname(__file__), "encodings.pkl"), "wb") as f:
#     pickle.dump((known_face_encodings, known_face_names, known_user_ids), f)

# print("🎉 Encodings saved to encodings.pkl")





import os
import requests
from io import BytesIO
from PIL import Image, ExifTags
import face_recognition
import pickle
from pymongo import MongoClient
from bson import ObjectId
import threading
import time

# -----------------------------
# Config
# -----------------------------
MONGO_URI = "mongodb+srv://milansocialms_db_user:X8sx6tAiQ5f4QTb9@cluster0.fmpmzrb.mongodb.net/"
DB_NAME = "fyp-pro"
COLLECTION_NAME = "registrations"
TEMP_FOLDER = "temp_images"
os.makedirs(TEMP_FOLDER, exist_ok=True)

# -----------------------------
# Connect to MongoDB
# -----------------------------
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# -----------------------------
# Load existing encodings
# -----------------------------
try:
    with open("encodings.pkl", "rb") as f:
        known_face_encodings, known_face_names, known_user_ids = pickle.load(f)
    print(f"📦 Loaded {len(known_face_names)} existing encodings")
except FileNotFoundError:
    known_face_encodings, known_face_names, known_user_ids = [], [], []
    print("📦 No existing encodings found, starting fresh")

# -----------------------------
# Helper Functions
# -----------------------------
def download_image(url, filename):
    """Download image from URL to TEMP_FOLDER"""
    response = requests.get(url)
    response.raise_for_status()
    file_path = os.path.join(TEMP_FOLDER, filename)
    with open(file_path, "wb") as f:
        f.write(response.content)
    return file_path

def load_and_correct_image(path):
    """Load image and correct orientation"""
    image = Image.open(path)
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == "Orientation":
                break
        exif = image._getexif()
        if exif is not None:
            ori = exif.get(orientation)
            if ori == 3:
                image = image.rotate(180, expand=True)
            elif ori == 6:
                image = image.rotate(270, expand=True)
            elif ori == 8:
                image = image.rotate(90, expand=True)
    except Exception:
        pass

    image = image.convert("RGB")
    image.save(path)
    return path

def encode_registration(reg):
    """Encode face from registration document"""
    name = reg.get("full_name", f"user_{reg['_id']}")
    user_id = str(reg["_id"])
    image_url = reg.get("imageUrl")

    if not image_url:
        print(f"⚠️ {name} has no imageUrl")
        return

    if user_id in known_user_ids:
        print(f"ℹ️ {name} already encoded")
        return

    try:
        filename = f"{user_id}.jpg"
        path = download_image(image_url, filename)
        path = load_and_correct_image(path)

        image_array = face_recognition.load_image_file(path)
        encodings = face_recognition.face_encodings(image_array)
        os.remove(path)  # delete temp image

        if encodings:
            known_face_encodings.append(encodings[0])
            known_face_names.append(name)
            known_user_ids.append(user_id)
            print(f"✅ Encoded {name} (ID {user_id})")

            # Save updated encodings immediately
            with open("encodings.pkl", "wb") as f:
                pickle.dump((known_face_encodings, known_face_names, known_user_ids), f)
                print("💾 Encodings updated and saved")
        else:
            print(f"⚠️ No face found in {name}'s image")

    except Exception as e:
        print(f"❌ Failed to encode {name}: {e}")

# -----------------------------
# Encode existing docs not yet encoded
# -----------------------------
encoded_ids_set = set(known_user_ids)
for reg in collection.find():
    if str(reg["_id"]) not in encoded_ids_set:
        encode_registration(reg)

# -----------------------------
# Watch for new registrations in real-time
# -----------------------------
def watch_new_registrations():
    print("👀 Watching for new registrations...")
    try:
        with collection.watch([{"$match": {"operationType": "insert"}}]) as stream:
            for change in stream:
                new_doc = change["fullDocument"]
                encode_registration(new_doc)
    except Exception as e:
        print(f"❌ Watcher error: {e}")

# -----------------------------
# Run watcher in separate thread
# -----------------------------
watcher_thread = threading.Thread(target=watch_new_registrations, daemon=True)
watcher_thread.start()

# -----------------------------
# Keep script alive
# -----------------------------
print("🎉 Face encoding service running...")
while True:
    time.sleep(10)