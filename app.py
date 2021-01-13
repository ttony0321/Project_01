from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbtrello


## HTML 화면 보기
@app.route('/')
def homework():
    return render_template('Main.html')


# 주문하기(POST) API
@app.route('/list', methods=['POST'])
def save_list():

    list_receive = request.form['list_title']

    doc = {
        'List_title': list_receive,

    }

    db.List_show.insert_one(doc)

    return jsonify({'result': 'success'})


@app.route('/card', methods=['POST'])
def save_card():

    card_receive = request.form['card_title']
    card_id_receive = request.form['card_id']

    doc = {
        'Card_title': card_receive,
        'card_id': card_id_receive
    }

    db.Card_show.insert_one(doc)

    return jsonify({'result': 'success'})


@app.route('/memo', methods=['GET'])
def view_list():
    list_show = list(db.List_show.find({}, {'_id': 0}))
    return jsonify({'result': 'success', 'list_show': list_show})


@app.route('/memo2', methods=['GET'])
def view_card():
    card_show = list(db.Card_show.find({}, {'_id': 0}))
    return jsonify({'result': 'success', 'card_show': card_show})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)