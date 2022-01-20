import { Gnome } from "../models/gnome";

export const gnome1 = {
    "id": 0,
    "name": "Tobus Quickwhistle",
    "thumbnail": "http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg",
    "age": 306,
    "weight": 39.065952,
    "height": 107.75835,
    "hair_color": "Pink",
    "professions": [
        "Metalworker",
        "Woodcarver",
        "Stonecarver",
        " Tinker",
        "Tailor",
        "Potter"
    ],
    "friends": [
        "Cogwitz Chillwidget",
        "Tinadette Chillbuster"
    ]
}

export const gnome2 = {
    "id": 1,
    "name": "Fizkin Voidbuster",
    "thumbnail": "http://www.publicdomainpictures.net/pictures/120000/nahled/white-hen.jpg",
    "age": 288,
    "weight": 35.279167,
    "height": 110.43628,
    "hair_color": "Green",
    "professions": [
        "Brewer",
        "Medic",
        "Prospector",
        "Gemcutter",
        "Mason",
        "Tailor"
    ],
    "friends": []
}

export const gnomes: Gnome[] = [gnome1, gnome2];
