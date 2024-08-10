import json

class Album:
    def __innit__(self, title, genre, release_year, band, stock, rating):
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
        print(f"\tcd x{cd_stock}\n\tvinyl x{vinyl_stock}\n\tcassette tape x{tape_stock}")
        track_counter = 1
        print("\t\tTracks")
        for track in music['tracks']:
            print(f"\t\t{track_counter}. {track}")
            track_counter+=1


def write_json(n=0, new_data=None):
    if not isinstance(n, int):
        print('error: needed a number')
    #  n = 0 for basic writing of data, n = 1 if you want to append a music object to the data
    if n == 1:
        data = read_json()
        data.append(new_data.to_dict())
        with open("database.json", "w") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    else:
        with open("database.json", "w") as f:
            json.dump(new_data, f, ensure_ascii=False, indent=4)


# used to update existing albums in the database
def update_music(title):
    if not isinstance(title, str):
        print('error')
        return
    change_what = input("What would you like to update? title, band, stock, genre, release, or rating? ").lower()
    data = read_json()
    for music in data:
        if music['title'].lower() == title.lower():
            to_what = input(f"What would you like to change the {change_what} to? ")
            if change_what == 'stock':
                medium = input("Change in # of cds, vinyls, or tapes? ").lower()[0]
                stock_type = {'c': 'cd', 'v': 'vinyl', 't': 'tape'}
                if medium in stock_type:
                    music['stock'][stock_type[medium]] = int(to_what)
            elif change_what in {'release', 'release year'}:
                music['release year'] = int(to_what)
            elif change_what == 'rating':
                music['rating'] = int(to_what)
            else:
                try:
                    music[change_what] = to_what
                except KeyError:
                    print(f"{change_what} does not exist.")
            write_json(0, data)
    # add a tracks param



view_music()

