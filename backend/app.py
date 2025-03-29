from flask import Flask, Response
import cv2
import face_recognition

app = Flask(__name__)

# Initialize the webcam
video_capture = cv2.VideoCapture(0)

# Known face encodings for recognition (you should add your known faces here)
known_face_encodings = []
known_face_names = []

# Example of loading a sample image and getting the face encoding (You need to do this with your dataset)
# image_of_person = face_recognition.load_image_file("person.jpg")
# person_encoding = face_recognition.face_encodings(image_of_person)[0]
# known_face_encodings.append(person_encoding)
# known_face_names.append("Person Name")

def gen_frames():
    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        # Convert image from BGR (OpenCV format) to RGB (face_recognition format)
        rgb_frame = frame[:, :, ::-1]

        # Get face locations and encodings
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]

            # Draw a rectangle around the face and label it with the name
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_DUPLEX, 0.5, (255, 255, 255), 1)

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return "Face Recognition Server Running!"

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
