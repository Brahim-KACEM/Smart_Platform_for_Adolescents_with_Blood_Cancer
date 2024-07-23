import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
from keras.models import load_model
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, LSTM, SpatialDropout1D
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize 
from keras.utils import to_categorical
from nltk.stem import PorterStemmer

import re
import string
nltk.download('stopwords')
import json
import random
import spacy
from spacy.language import Language
from spacy_langdetect import LanguageDetector
from sklearn.feature_extraction.text import TfidfVectorizer
import mysql.connector
import requests

nlp = spacy.load("fr_core_news_sm")




suicide = load_model('LSTM.h5')
sentiment = joblib.load('nb.pkl')
tfidf = joblib.load('tfidf.pkl')
tokenizer = joblib.load('tokenizer.pkl')
model = load_model('model.h5')


# Fonction pour détecter la langue
def get_lang_detector(nlp, name):
    return LanguageDetector()

# Ajoutez le composant LanguageDetector à spaCy
Language.factory("language_detector", func=get_lang_detector)
nlp.add_pipe('language_detector', last=True)

intents = json.loads(open('intents.json', encoding='utf-8').read())

words = pickle.load(open('texts.pkl', 'rb'))
classes = pickle.load(open('labels.pkl', 'rb'))

def preprocessing(text):
    text = text.lower() 
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>', '', text )
    text = re.sub(f"[{re.escape(string.punctuation)}]", "", text)  
    words = text.split()
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]  
    stemmer = PorterStemmer()
    words = [stemmer.stem(word) for word in words]
    return ' '.join(words)

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    if ints:
        tag = ints[0]['intent']
        list_of_intents = intents_json['intents']
        for i in list_of_intents:
            if i['tag'] == tag:
                result = random.choice(i['responses'])
                break
        return result
    else:
        return "Désolé, je n'ai pas compris."

def chatbot_response(msg):
    doc = nlp(msg)
    detected_language = doc._.language['language']
    print(f"Langue détectée chatbot_response:- {detected_language}")

    chatbotResponse = "Chargement de la réponse du bot..........."
    res = getResponse(predict_class(msg, model), intents)
    chatbotResponse = res
    print("fr chatbot_response:- ", res)

    return chatbotResponse

from flask import Flask, render_template, request
from flask import redirect, jsonify
from datetime import datetime

app = Flask(__name__)
app.static_folder = 'static'

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="edu_robot"
)

@app.route("/")
def home():
    return render_template("index.html")
from googletrans import Translator
translator = Translator()
max_length = 100



@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    input=userText
    print("get_bot_response:- " + userText)

    doc = nlp(userText)
    detected_language = doc._.language['language']
    print(f"Langue détectée get_bot_response:- {detected_language}")

    bot_response_text = "Chargement de la réponse du bot..........."
    english_user_text = translator.translate(userText, src='fr', dest='en').text
    print("Translated user text to English:", english_user_text)

    english_text = [english_user_text]
    X = tfidf.transform(english_text)
    predictions = sentiment.predict(X)

    print(predictions)

    preprocessed_text = preprocessing(english_user_text)
    text_sequence = tokenizer.texts_to_sequences([preprocessed_text])
    text_padded = pad_sequences(text_sequence, maxlen=max_length)
    predicted_class = suicide.predict(text_padded)
    predicted_label = np.argmax(predicted_class, axis=1)
    print("Predicted class:", predicted_label)  

    if predicted_label[0] == 1:
        
      cursor = mydb.cursor()
      sql = "INSERT INTO suicide_cases (suicide, date, userId) VALUES (%s, %s, %s)"
      val = (1, datetime.now(), getUserIdFromUrl())
      cursor.execute(sql, val)
      mydb.commit()
      print("Cas de suicide enregistré dans la base de données.")

    if predicted_label in [1, 2]:
        
        redirect_to_quiz = True
        bot_response_text = ""
    else:
    
        redirect_to_quiz = False
        bot_response_text=chatbot_response(input)

    return jsonify({"bot_response": bot_response_text, "redirect_to_quiz": redirect_to_quiz})

from flask import request
current_url = None

@app.route("/saveUrl", methods=["GET"])
def save_url():
    global current_url
    current_url = request.url
    
    print("URL récupérée :", current_url)
    
    
    return 'URL enregistrée avec succès.'



from urllib.parse import urlparse, parse_qs


def getUserIdFromUrl():
    global current_url
    print("URL dans getUserIdFromUrl :", current_url)
    if current_url:
       
        parsed_url = urlparse(current_url)
        query_params = parse_qs(parsed_url.query)
        
        url = query_params.get('url', [None])[0]
        if url:
          
            match = re.search(r'userId=(\d+)', url)
            if match:
                user_id = match.group(1)
                print("User ID from URL:", user_id)
                return user_id
    return None



if __name__ == "__main__":
    app.run()
