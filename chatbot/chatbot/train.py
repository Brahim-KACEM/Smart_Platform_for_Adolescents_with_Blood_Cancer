import pandas as pd

# Charger la base de données fusionnée depuis Google Drive
df = pd.read_csv("base_de_donnees_final.csv")

# Compter le nombre d'occurrences de chaque label
counts = df['label'].value_counts()

# Afficher les résultats
print("Nombre de textes avec le label 0:", counts.get(0, 0))
print("Nombre de textes avec le label 1:", counts.get(1, 0))
print("Nombre de textes avec le label 2:", counts.get(2, 0))

import pandas as pd
import numpy as np
import joblib
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
import re
import nltk
nltk.download('punkt')
nltk.download('stopwords')

# Charger la base de données mélangée
data = pd.read_csv("base_de_donnees_final.csv")

# Supprimer les lignes contenant des valeurs nulles
data = data.dropna(how='any')

# Prétraitement des données textuelles
def preprocess_text(text):
    # Convertir en minuscules
    text = text.lower()
    # Supprimer les URL
    text = re.sub(r'http\S+', '', text)
    # Supprimer la ponctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Tokenization
    tokens = word_tokenize(text)
    # Supprimer les stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    # Rejoindre les tokens en une seule chaîne de texte
    preprocessed_text = ' '.join(tokens)
    return preprocessed_text

# Appliquer la fonction de prétraitement aux textes
data['text'] = data['text'].apply(preprocess_text)

# Afficher les premières lignes de la base de données après prétraitement
print(data.head())

# Séparer les données en fonction des fonctionnalités (X) et de la cible (y)
X = data['text']
y = data['label']

# Diviser les données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectoriser les textes en utilisant TF-IDF
tfidf = TfidfVectorizer(max_features=2500, min_df=2)
X_train = tfidf.fit_transform(X_train).toarray()
X_test = tfidf.transform(X_test).toarray()

# Définir et entraîner le modèle Naive Bayes multinomial
nb = MultinomialNB()
nb.fit(X_train, y_train)

# Faire des prédictions sur l'ensemble de test et évaluer le modèle
y_pred_nb = nb.predict(X_test)
accuracy_nb = accuracy_score(y_test, y_pred_nb)
precision_nb = precision_score(y_test, y_pred_nb, average='weighted')
recall_nb = recall_score(y_test, y_pred_nb, average='weighted')
f1_nb = f1_score(y_test, y_pred_nb, average='weighted')

print("Naive Bayes:")
print(f"Accuracy: {accuracy_nb}")
print(f"Precision: {precision_nb}")
print(f"Recall: {recall_nb}")
print(f"F1 Score: {f1_nb}")

joblib.dump(nb, 'sentiment.pkl')