/**
 * ScoutCard
 * Country Flags
 */


const countries = {


    "Afghanistan": "af",
    "Albania": "al",
    "Algeria": "dz",
    "Angola": "ao",
    "Argentina": "ar",
    "Australia": "au",
    "Austria": "at",

    "Belgium": "be",
    "Brazil": "br",
    "Bulgaria": "bg",

    "Cameroon": "cm",
    "Canada": "ca",
    "Chile": "cl",
    "China": "cn",
    "Colombia": "co",
    "Croatia": "hr",
    "Czech Republic": "cz",

    "Denmark": "dk",

    "Ecuador": "ec",
    "Egypt": "eg",
    "England": "gb",

    "Finland": "fi",
    "France": "fr",

    "Germany": "de",
    "Ghana": "gh",
    "Greece": "gr",

    "Hungary": "hu",

    "Iceland": "is",
    "India": "in",
    "Indonesia": "id",
    "Ireland": "ie",
    "Israel": "il",
    "Italy": "it",

    "Japan": "jp",
    "Jamaica": "jm",

    "Korea Republic": "kr",

    "Mexico": "mx",
    "Morocco": "ma",

    "Netherlands": "nl",
    "New Zealand": "nz",
    "Nigeria": "ng",
    "Norway": "no",

    "Paraguay": "py",
    "Peru": "pe",
    "Poland": "pl",
    "Portugal": "pt",

    "Romania": "ro",
    "Russia": "ru",

    "Saudi Arabia": "sa",
    "Scotland": "gb",
    "Senegal": "sn",
    "Serbia": "rs",
    "Slovakia": "sk",
    "Slovenia": "si",
    "South Africa": "za",
    "Spain": "es",
    "Sweden": "se",
    "Switzerland": "ch",

    "Turkey": "tr",

    "Ukraine": "ua",
    "United Arab Emirates": "ae",
    "United States": "us",
    "United States of America": "us",
    "USA": "us",

    "Uruguay": "uy",

    "Venezuela": "ve",

    "Wales": "gb",

    "Curaçao": "cw",
    "Kosovo": "xk"

};



export default function countryToCode(name) {


    if (!name) {

        return "";

    }



    return (

        countries[name] ||

        ""

    );

}