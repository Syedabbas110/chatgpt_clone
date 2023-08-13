from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
import openai

openai.api_key = "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"

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://syedabbasu:U4iGpsq6xpCtsv9C@cluster0.iypgfwv.mongodb.net/chatgpt"
mongo = PyMongo(app)

@app.route("/")
def home():
    return render_template("index.html", myChats = [chat for chat in mongo.db.chats.find({})])

@app.route("/api", methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        question = request.json.get("question")
        chat = mongo.db.chats.find_one({"question": question})
        if chat:
            data = {"question": question, "answer": f"{chat['answer']}"}
            return jsonify(data)
        else:
            response = openai.Completion.create(
                    model="text-davinci-003",
                    prompt=question,
                    temperature=0.7,
                    max_tokens=256,
                    top_p=1,
                    frequency_penalty=0,
                    presence_penalty=0
                )
            data = {"question": question, "answer": response["choices"][0]["text"]}
            mongo.db.chats.insert_one(data)
            return jsonify(data)
    return "nothing here"

app.run(debug=True)

# from flask import Flask
# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

# app.run(debug=True)