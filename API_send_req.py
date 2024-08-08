from flask import Flask, request, jsonify
import json
from flask_cors import CORS, cross_origin

# # custom main.py
# import main

app = Flask(__name__)
CORS(app)


@app.route("/")
# @cross_origin(supports_credentials=True)
def login():
    return "Home"


with open('database.json', 'r') as f:
    try:
        with open("database.json", 'r') as f:
            songs = json.load(f)
    except FileNotFoundError:
        print("file not found")
    except json.JSONDecodeError:
        print("decode error - file might be corrupt or empty")
print(songs)


@app.route("/find-album/<album_title>")
def find_song(album_title):
    album_data = {}
    for song in songs:
        if (song['title']).lower() == (album_title).lower():
            album_data[album_title] = {
                'title': song['title'],
                'band': song['band'],
                'genre': song['genre'],
                'release year': int(song['release year']),
                'rating': int(song['rating']),
                'stock': song['stock'],
                "tracks": song['tracks']

            }
    return jsonify(album_data[album_title]), 200


@app.route("/all-songs")
def show_songs():
    return songs


@app.route("/add-music", methods=["POST"])
def create_music():
    try:
        data = request.get_json()
        if not data:
            raise ValueError("No JSON data received")
        data = request.get_json()
        # songs.append(
        #     {
        #     'title': data['title'],
        #     'band': data['band'],
        #     'genre': data['genre'],
        #     'release year': data['release year'],
        #     'rating': data['rating'],
        #     'stock': data['stock'],
        #     "tracks": data['tracks']
        #     }
        # )
        songs[len(songs) - 1] = {
            'title': data['title'],
            'band': data['band'],
            'genre': data['genre'],
            'release year': int(data['release year']),
            'rating': int(data['rating']),
            'stock': data['stock'],
            "tracks": data['tracks']
        }
        return jsonify(songs[len(songs) - 1]), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=1982)
