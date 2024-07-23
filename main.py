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

with open("database.json", 'r') as f:
    data = json.load(f)