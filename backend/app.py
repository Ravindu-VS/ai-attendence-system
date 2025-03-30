from flask import Flask, request, jsonify
import cv2
import os
import numpy as np
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)

# Path to save uploaded videos
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# OpenCV face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def train_model(video_file_path):
    # Read video
    video_capture = cv2.VideoCapture(video_file_path)
    face_samples = []
    ids = []

    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        for (x, y, w, h) in faces:
            face = gray[y:y+h, x:x+w]
            face_samples.append(face)
            ids.append(1)

    video_capture.release()

    # Use OpenCV LBPH face recognizer for training the model
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.train(face_samples, np.array(ids))

    # Save the model
    recognizer.save('face_model.yml')

@app.route('/signup', methods=['POST'])
def signup():
    # Collect form data
    name = request.form['name']
    registration_number = request.form['registrationNumber']
    intake = request.form['intake']
    stream = request.form['stream']
    address = request.form['address']
    contact_number = request.form['contactNumber']
    dob = request.form['dob']

    # Get the video file from the form data
    video = request.files['video']
    filename = secure_filename(video.filename)
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    video.save(video_path)

    # Train the model with the captured video
    train_model(video_path)

    # Save the user data to the database (example, MongoDB or other databases)
    # You can also save the path to the model here, or other relevant details.
    
    return jsonify({'message': 'User registered and face model trained successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
