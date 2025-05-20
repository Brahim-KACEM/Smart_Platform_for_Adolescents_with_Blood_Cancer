
# 🧠 Intelligent Platform for Supporting Adolescents with Blood Cancer

This project is a web-based intelligent platform designed to provide psychological and medical support to adolescents diagnosed with blood cancer and their parents. It includes features such as an AI-powered chatbot, mental health assessment quizzes, educational content, and blood test (NFS) analysis using image processing and machine learning.

## 📌 Project Overview

**Main Features:**
- **Chatbot**: Trained on medical and psychological content to answer FAQs and detect suicidal or depressive language.
- **Mental Health Quiz (HADS)**: To assess depression and anxiety levels.
- **NFS Analyzer**: Uses image processing and ML to interpret blood test reports.
- **Educational Modules**: Interactive quizzes on understanding and coping with blood cancer.
- **Admin Interface**: Manage users and content (quizzes, chapters).
- **Multi-role Access**: Interfaces for adolescents, parents, and administrators.

## 🚀 Technologies Used

### 🌐 Web Development

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MySQL
- **Local Development Server**: XAMPP (for MySQL and Apache)
- **Deployment of Chatbot & ML Models**: Flask (Python micro-framework)

### 🤖 Machine Learning & NLP

- **Language**: Python
- **Libraries**: TensorFlow, Keras, Scikit-learn, NLTK, spaCy, Pandas, NumPy
- **Model Types**:
  - Chatbot: ANN (Artificial Neural Network)
  - Suicidal Thought Detection: LSTM
  - Depression/Anxiety: Naive Bayes
  - Blood Test Prediction: MLP (Multilayer Perceptron)

### 🖼️ Image Processing

- **OCR**: pytesseract
- **Image Handling**: PIL (Pillow)
- **Preprocessing**: scikit-learn and OpenCV (if extended)

## ⚙️ Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Python 3.9+](https://www.python.org/)
- [XAMPP](https://www.apachefriends.org/) (for local MySQL server)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) (optional GUI)
- `pip`, `npm`, `virtualenv` installed

## 🛠️ Setting Up the Project

### 1. Frontend (React)

```bash
cd client
npm install
npm start
```

### 2. Backend (Node.js)

```bash
cd server
npm install
node index.js
```

### 3. Database (MySQL)

- Start XAMPP → Start Apache and MySQL
- Import the provided `.sql` file using phpMyAdmin or MySQL CLI.
- Update DB config in `server/config/db.js`

### 4. Python Flask Server (Chatbot & Models)

```bash
cd ml-server
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

## 📂 Project Structure

```
.
├── client/              # React Frontend
├── server/              # Node.js Backend
├── ml-server/           # Flask APIs + Trained ML models
├── dataset/             # CSV & training data
├── models/              # Trained models: .h5, .pkl files
├── README.md
```

## 🔐 Authentication

All routes requiring login are secured via **JWT Tokens**.

Roles:
- **Adolescent**
- **Parent**
- **Admin**

## 🧪 Testing

- Run `npm test` inside the `client/` and `server/` folders for unit tests.
- Python models can be tested using `pytest` in the `ml-server/` folder.

## 📌 Notes

- Chatbot does not replace medical advice — only provides verified information.
- All data used is anonymized and compliant with ethical standards.
- Translations are supported (via `googletrans`) to support multilingual input.

## 📧 Contact

Project Authors:
- Ecile Haoues  
- Brahim Kacem  
- Yassine Boujebha  

Academic Supervisor:  
**Dr. Fadoua Ouamani**  
ENSI — Université de la Manouba
