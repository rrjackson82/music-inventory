from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route("/")
def dude():
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
    return jsonify(album_data), 200


@app.route("/all-songs")
def show_songs():
    return songs


@app.route("/add-music", methods=["POST"])
def create_music():
    data = request.get_json()
    song_title = data['title']
    songs.append({})
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


# @app.route("/get-user/<int:user_id>")
# def get_user(user_id):
#     user_data = songs.get(user_id)
#     return jsonify(user_data), 200
#
#
# @app.route("/create-user", methods=["POST"])
# def create_user():
#     data = request.get_json()
#     user_id = data['user-id']
#     songs[user_id] = {
#         "name": data['name'],
#         "age": data['age'],
#         "id": data['user-id']
#     }
#     print(songs)
#     return jsonify(songs[user_id]), 201


if __name__ == "__main__":
    app.run(debug=True)
