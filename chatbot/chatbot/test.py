from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences

from keras.utils import to_categorical
import numpy as np
import pandas as pd
from keras.models import load_model

model = load_model('model3.keras')
model2 = load_model('model2.h5')
train_ds = pd.read_csv('train.csv', encoding='latin1')
validation_ds = pd.read_csv('test.csv', encoding='latin1')

train_ds = train_ds[['text', 'sentiment']]
validation_ds = validation_ds[['text', 'sentiment']]

train_ds['text'].fillna('',inplace=True)
validation_ds['text'].fillna('',inplace=True)
# Fonction de transformation des étiquettes de sentiment
def func(sentiment):
    if sentiment == 'positive':
        return 0
    elif sentiment == 'negative':
        return 1
    else:
        return 2

train_ds['sentiment'] = train_ds['sentiment'].apply(func)
validation_ds['sentiment'] = validation_ds['sentiment'].apply(func)

x_train = np.array(train_ds['text'].tolist())
tokenizer = Tokenizer(num_words=20000)
tokenizer.fit_on_texts(x_train)


text = "i am sad"

new_text_seq = tokenizer.texts_to_sequences([text])
print(new_text_seq)
new_text_padded = pad_sequences(new_text_seq, padding='post', maxlen=35)  # Use the max_len determined during training
predictions = model.predict(new_text_padded)

print(predictions)
predicted_class_index = predictions.argmax(axis=-1)
print(predicted_class_index)
if predicted_class_index[0] == 0:
    print("Postive Sentiment")
elif predicted_class_index[0] == 1:
    print("Negative Sentiment")
else:
    print("Neutral Sentiment")

text1 = "i am happy"

new_text_seq = tokenizer.texts_to_sequences([text1])
new_text_padded = pad_sequences(new_text_seq, padding='post', maxlen=35)  # Use the max_len determined during training
predictions = model2.predict(new_text_padded)
print(predictions)
predicted_class_index = predictions.argmax(axis=-1)
print(predicted_class_index)
if predicted_class_index[0] == 0:
    print("Postive Sentiment")
elif predicted_class_index[0] == 1:
    print("Negative Sentiment")
else:
    print("Neutral Sentiment")