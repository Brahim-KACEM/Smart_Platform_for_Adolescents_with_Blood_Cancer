from PIL import Image, ImageEnhance
from pytesseract import pytesseract
import re
import enum
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow import keras
from keras.layers import Dense
from sklearn.neighbors import KNeighborsClassifier
from keras.models import Sequential, load_model
import pickle
from flask import Flask, render_template, request
from flask_ngrok import run_with_ngrok
from flask import redirect, url_for


app = Flask(__name__)

class OS(enum.Enum):
    Mac = 0
    Windows = 1

class ImageReader:
    def __init__(self, os: OS):
        if os == OS.Mac:
            print('Running on: MAC\n')
        elif os == OS.Windows:
            windows_path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            pytesseract.tesseract_cmd = windows_path
            print('Running on : WINDOWS\n')

    def preprocess_image(self, file):
     img = Image.open(file)
     enhancer = ImageEnhance.Contrast(img)
     img = enhancer.enhance(1.2)
     img = img.convert('L')
     return img

    def extract_text(self, file) -> str:
     preprocessed_img = self.preprocess_image(file)
     extracted_text = pytesseract.image_to_string(preprocessed_img, config='--psm 6')
     return extracted_text

    def extract_essential_info(self, text: str):
        extracted_info = {}
        keywords_to_extract = [
            'GLOBULES ROUGES',
            'HEMOGLOBINE',
            'HEMATOCRITE',
            'Volume Globulaire Moyen',
            'Taux Globulaire Moyen',
            'LEUCOCYTES',
            'PLAQUETTES',
            'GR',
            'VGM',
            'TCMH'
        ]
        for line in text.split('\n'):
            for keyword in keywords_to_extract:
                match = re.search(rf'{re.escape(keyword)}\.*[^.\d]*([\d]+\.?[\d]*)', line)
                if match:
                    value = match.group(1)
                    value = value.replace(',', '.')
                    extracted_info[keyword] = float(value.strip())
        return extracted_info
    

  
    
    def predict_and_display(self, file, model, scaler):
     image_reader = ImageReader(OS.Windows)  # Vous pouvez remplacer OS.Windows par le bon OS
     text = self.extract_text(file)
     extracted_info = self.extract_essential_info(text)
    # Créez un DataFrame pandas avec les informations extraites
     X = pd.DataFrame([extracted_info])

    # Normalisez les données en utilisant le scaler
     X_normalized = scaler.transform(X)

    # Faites la prédiction à l'aide du modèle
     result = model.predict(X_normalized)[0]

    # Ajoutez des contraintes basées sur les valeurs extraites
     globules_rouges = extracted_info.get('GLOBULES ROUGES', 0)
     hemoglobine = extracted_info.get('HEMOGLOBINE', 0)
     leucocytes = extracted_info.get('LEUCOCYTES', 0)
     vgm = extracted_info.get('Volume Globulaire Moyen', 0)
     tcmh = extracted_info.get('Taux Globulaire Moyen', 0)
     plq = extracted_info.get('PLAQUETTES', 0)
     if len(str(plq))<=5: plq=plq*1000
     
    # Supposons que les valeurs critiques soient définies comme suit (ce sont des exemples, ajustez selon vos critères)
     critere_globules_rouges = (4.5 <= globules_rouges <= 5.9)
     critere_hemoglobine = (13 <= hemoglobine <= 17)
     critere_leucocytes = (4.0 <= leucocytes <= 11.0)
     critere_plq = (150000 <= plq <= 445000)
     if isinstance(leucocytes, (int, float)):
    # Convertir en chaîne pour faciliter la manipulation
        leucocytes_str = str(leucocytes)
    # Vérifier s'il y a une virgule
        if '.' in leucocytes_str:
        # Si oui, supprimer la virgule et convertir en nombre
         leucocytes = int(leucocytes * 1000) if len(leucocytes_str.split('.')[1]) <= 3 else int(leucocytes * 100)

 
     
     result_message=""
    # Déterminez le message à afficher en fonction des critères supplémentaires
     if result < 0.5 or not (critere_globules_rouges and critere_hemoglobine and critere_leucocytes and critere_plq):
         if globules_rouges < 4.0:
            result_message += ("""Ces globules rouges sont importants car ils transportent l'oxygène dans tout le corps. \n
                                  Un faible nombre peut être dû à des problèmes comme l'anémie, qui peut rendre l'enfant fatigué ou faible. \n""")
            if vgm < 80:
                result_message += ("""Le taux globulaire moyen est bas, ce qui signifie que la concentration de globules rouges dans le sang est plus faible que la normale.\n
                                      Cela peut indiquer différentes conditions médicales :\n
                                      comme une anémie ou des problèmes de production de globules rouges dans la moelle osseuse.\n""")
            if tcmh < 28.0:
                result_message += ("Vous avez un taux globulaire moyen bas, donc c'est une anémie par carence martiale, \n"
                                   "carence de fer !\n")
            if vgm > 100:
                result_message += ("""Le volume globulaire moyen est élevé, ce qui peut indiquer que les globules rouges sont plus gros que la normale. \n
                                      Cela peut être dû à divers facteurs, tels qu'une carence en vitamines,\n
                                      des problèmes de moelle osseuse ou des conditions médicales sous-jacentes.\n""")
                
            
         if leucocytes < 3800:
            result_message += ("""Le nombre de leucocytes est faible, ce qui indique une diminution des globules blancs dans le sang. \n
                                  Les globules blancs sont importants pour combattre les infections et maintenir un système immunitaire sain.\n 
                                  Un faible nombre de leucocytes peut être dû à des infections, à des troubles de la moelle osseuse ou à certains médicaments.\n""")
         if leucocytes > 10000:
            result_message += ("""Le nombre de leucocytes est élevé, ce qui indique une augmentation des globules blancs dans le sang. \n
                                  Les globules blancs sont des cellules importantes du système immunitaire qui combattent les infections.\n
                                  Une augmentation du nombre de leucocytes peut être due à diverses raisons, telles qu'une infection, une inflammation ou une réaction à un stress physique ou émotionnel.\n""")
         if plq < 150000:
            result_message += ("""Le nombre de plaquettes est bas, ce qui peut causer des problèmes de saignement. \n
                                  Les plaquettes aident à arrêter les saignements, donc en avoir moins peut rendre difficile la cicatrisation des blessures.\n
                                  Cela peut être dû à des raisons comme des infections, des médicaments ou des soucis de santé.\n""")
         if plq > 445000:
            result_message += ("""Le nombre de plaquettes est élevé, ce qui peut causer des problèmes de coagulation sanguine. \n
                                  Cela peut arriver à cause de différents facteurs, comme des infections ou des soucis dans la moelle osseuse.\n""")
         
     else :
        result_message =  ("""Je suis heureux de vous informer que les résultats de votre hémogramme sont normaux.\n
                            Tous les indicateurs, y compris les globules rouges, les globules blancs et les plaquettes, sont dans les limites normales. \n
                            Continuez à prendre soin de votre santé ! \U0001F4AA \n""")
     
     return result_message

#run_with_ngrok(app)

@app.route('/')
@app.route('/home', methods=['GET', 'POST'])
def index():
    return render_template('interface.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # Vérifiez si le fichier est bien envoyé dans la requête
        if 'file' not in request.files:
            return "No file part"

        file = request.files['file']
        # Si l'utilisateur n'a pas sélectionné de fichier, un message d'erreur sera retourné
        if file.filename == '':
            return "No selected file"

        # Créer une instance de ImageReader
        image_reader = ImageReader(OS.Windows)  # Vous pouvez remplacer OS.Windows par le bon OS

        # Charger le modèle et le scaler
        model = load_model(r"C:\Users\user\Desktop\officiel WORK\modele2.h5")
        with open(r"C:\Users\user\Desktop\officiel WORK\scaler.pkl", 'rb') as f:
            scaler = pickle.load(f)

        # Appeler la méthode predict_and_display à partir de l'instance image_reader
        result_message = image_reader.predict_and_display(file, model, scaler)
        
        # Rediriger vers la page de résultat en passant le message en paramètre
        return redirect(url_for('show_result', message=result_message))

# Décommentez la route suivante pour activer la page résultat
from bleach import clean

@app.route('/resultat')
def show_result():
    # Récupérer le message de résultat passé en paramètre
    result_message = request.args.get('message')
    clean_message = clean(result_message, tags=[], attributes={}, strip=True)

   # Nettoyer le contenu HTML de la variable message avant de le passer au modèle
    clean_message = clean_message.strip()  # Supprime les espaces en début et en fin de chaîne
    clean_message = clean_message.replace('\n', '')  # Supprime les sauts de ligne
    clean_message = clean_message.replace('<style>', '')  # Supprime les balises <style>
    clean_message = clean_message.replace('</style>', '')  # Supprime les balises </style>
 

    return render_template('resultat.html', message=clean_message)


import sys

if __name__ == '__main__':
    port = 5001  # Port par défaut
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    app.run(host='127.0.0.1', port=port, debug=True)



