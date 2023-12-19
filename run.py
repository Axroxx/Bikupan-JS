import sys
import json

def process_form_data(form_data):
    # Your Python function to process form data goes here
    print("Received form data:", form_data)

if __name__ == "__main__":
    try:
        form_data_json = sys.argv[1]
        form_data = json.loads(form_data_json)
        process_form_data(form_data)
    except Exception as e:
        print("Error:", str(e))


from main import *
 
words = [
    "ANSATS", "APOTEK", "ARENAN", 
    "ARREST", "CERISE", "EDERAR", 
    "ELITEN", "EMEDAN", "EMIRAT", 
    "FRASER", "GALOPP", "HIMMEL", 
    "ISDANS", "KALORI", "KIKARE", 
    "LEDSEN", "LOTSEN", "MEDLEM", 
    "RASTER", "RIKTIG", "SÅLDES", 
    "STRASS", "TAKTER", "TYDLIG"
]

x = 22

start = hexClass(x,"E","R","F","A","R","A","ERFARA",True)
    


# Don't touch
main(words, x, start)

