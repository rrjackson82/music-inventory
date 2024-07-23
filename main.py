import json

class Album:
    def __innit__(self, title, genre, release_year, band, stock, medium, rating):
        self.title = title
        self.genre = genre
        self.release_year = release_year
        self.band = band
        self.stock = stock
        self.rating = rating

    def to_dict(self):
        return {
            'title': self.title,
            'band': self.band,
            'genre': self.genre,
            'release year': self.release_year,
            'rating': self.rating,
            'stock': self.stock
        }

#read the json file and output the data.
def read_json():
    try:
        with open("database.json", 'r') as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            else:
                return []
    except FileNotFoundError:
        print("file not found")
        return []
    except json.JSONDecodeError:
        print("decode error - file might be corrupt or empty")
        return []


# probably an easier way to do this but it gets the job done
def rating_to_stars(rating=0):
    if 5 >= rating >= 0:
        match rating:
            case 0:
                return "-----"
            case 1:
                return "*----"
            case 2:
                return "**---"
            case 3:
                return "***--"
            case 4:
                return "****-"
            case 5:
                return "*****"

# print out all your music to the console
def view_music():
    data = read_json()

    print('stored music: \n')
    for music in data:
        title = music['title']
        band = music['band']
        genre = music['genre']
        cd_stock = music['stock']['cd']
        vinyl_stock = music['stock']['vinyl']
        tape_stock = music['stock']['tape']
        year = music['release year']
        print(f"{title} | {band} | {year} | {rating_to_stars(music['rating'])}"
              f" ({music['rating']}/5) | genre: {genre}")
        print(f"\tcd: x{cd_stock}\n\tvinyl: {vinyl_stock}\n\tcassette tape: {tape_stock}")


view_music()