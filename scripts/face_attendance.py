# import cv2
# import face_recognition
# import pickle
# import os
# import pymongo
# import datetime
# from dotenv import load_dotenv
# import sys
# event_id = sys.argv[1] 

# # --- Load environment variables ---
# load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env.local"))

# MONGODB_URI = os.getenv("MONGODB_URI")
# DB_NAME = os.getenv("MONGODB_DB", "attendance_db")

# # --- Connect to MongoDB ---
# client = pymongo.MongoClient(MONGODB_URI)
# db = client[DB_NAME]
# collection = db["attendance"]

# print(f"✅ Connected to MongoDB Atlas Database: {DB_NAME}")

# # --- Load known face encodings ---
# enc_file = os.path.join(os.path.dirname(__file__), "encodings.pkl")
# with open(enc_file, "rb") as f:
#     known_face_encodings, known_face_names, known_user_ids = pickle.load(f)

# print("✅ Loaded known faces")

# # --- Start webcam ---
# video_capture = cv2.VideoCapture(0)
# if not video_capture.isOpened():
#     print("❌ Cannot access camera")
#     exit()

# session_attendance = set()

# print("📸 Starting face recognition... Press 'q' to quit")

# while True:
#     ret, frame = video_capture.read()
#     if not ret:
#         break

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     face_locations = face_recognition.face_locations(rgb_frame)
#     face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

#     for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
#         matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
#         name = "Unknown"
#         user_id = "0000"

#         if True in matches:
#             match_index = matches.index(True)
#             name = known_face_names[match_index]
#             user_id = known_user_ids[match_index]

#             today = datetime.date.today().strftime("%Y-%m-%d")
#             session_key = f"{user_id}_{today}"

#             if session_key not in session_attendance:
#                 now = datetime.datetime.now()
#                 record = {
#                      "event_id": event_id,
#                     "user_id": user_id,
#                     "name": name,
#                     "timestamp": now,
#                     "date": today,
#                     "time": now.strftime("%H:%M:%S"),
#                     "type": "Check-in"
#                 }
#                 collection.insert_one(record)
#                 session_attendance.add(session_key)
#                 print(f"🟢 Attendance marked for {name} ({user_id}) at {record['time']}")

#         # Draw box and name
#         color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
#         cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
#         cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)

#     cv2.imshow("Attendance System", frame)
#     if cv2.waitKey(1) & 0xFF == ord("q"):
#         break

# video_capture.release()
# cv2.destroyAllWindows()
# print("✅ Attendance process completed.")


import cv2
import face_recognition
import pickle
import os
import pymongo
import datetime
from dotenv import load_dotenv
import sys
import numpy as np

# -----------------------------
# Check arguments
# -----------------------------
if len(sys.argv) < 2:
    print("❌ Usage: python face_attendance.py <event_id>")
    sys.exit(1)

event_id = sys.argv[1]

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env.local"))

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGODB_DB", "attendance_db")

# -----------------------------
# Connect to MongoDB
# -----------------------------
client = pymongo.MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db["attendance"]

print(f"✅ Connected to MongoDB Atlas Database: {DB_NAME}")

# -----------------------------
# Load known face encodings
# -----------------------------
enc_file = "/Users/milanghimire/Code/fyp/Final_Year_Project/fresh start/fyp-pro/encodings.pkl"
if not os.path.exists(enc_file):
    print(f"❌ Encodings file not found at {enc_file}")
    sys.exit(1)

with open(enc_file, "rb") as f:
    known_face_encodings, known_face_names, known_user_ids = pickle.load(f)

print(f"✅ Loaded {len(known_face_names)} known faces from encodings.pkl")

# -----------------------------
# Start webcam
# -----------------------------
video_capture = cv2.VideoCapture(0)
if not video_capture.isOpened():
    print("❌ Cannot access camera")
    sys.exit(1)

session_attendance = set()
print("📸 Starting face recognition... Press 'q' to quit")

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    # Resize frame for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    # Detect faces
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        # Compare with known faces
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.5)
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)

        best_match_index = np.argmin(face_distances)
        name = "Unknown"
        user_id = "0000"

        if matches[best_match_index]:
            name = known_face_names[best_match_index]
            user_id = known_user_ids[best_match_index]

            today = datetime.date.today().strftime("%Y-%m-%d")
            session_key = f"{user_id}_{today}"

            if session_key not in session_attendance:
                now = datetime.datetime.now()
                record = {
                    "event_id": event_id,
                    "user_id": user_id,
                    "name": name,
                    "timestamp": now,
                    "date": today,
                    "time": now.strftime("%H:%M:%S"),
                    "type": "Check-in"
                }
                collection.insert_one(record)
                session_attendance.add(session_key)
                print(f"🟢 Attendance marked for {name} ({user_id}) at {record['time']}")

        # Draw rectangle and name
        # Scale back up since we used a smaller frame
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4
        color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    cv2.imshow("Attendance System", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video_capture.release()
cv2.destroyAllWindows()
print("✅ Attendance process completed.")