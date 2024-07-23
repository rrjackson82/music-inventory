import json

class Album:
    def __innit__(self, title, genre, release_year, band, stock, medium, rating):
        self.title = title
        self.genre = genre
        self.release_year = release_year
        self.band = band
        self.stock = stock
        self.medium = medium
        self.rating = rating

    def to_dict(self):
        return {
            'title': self.title,
            'band': self.band,
            'genre': self.genre,
            'medium': self.medium,
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


# probable an easier way to do this but it gets the job done
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
# might show the title of it and put the stock of every medium underneath it
# blizzard of ozz genre hard rock band ozzy:
#    cd x1
#    vinyl x1
def view_music():
    data = read_json()
    print("music: \n")
    for music in data:
        print(f"title: {music['title']}   |   band: {music['band']}   |   medium: {music['medium']}"
              f"   |   release year: {music['release year']}   |   genre: {music['genre']}   |   rating: "
              f"{rating_to_stars(int(music['rating']))}   |   stock: x{music['stock']}")

print(view_music())