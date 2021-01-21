from flask import Flask, render_template, jsonify, request, json, session, redirect, url_for
from bson import json_util
import jwt
import datetime
import hashlib

app = Flask(__name__)


from pymongo import MongoClient

client = MongoClient('localhost', 27017)
#client = MongoClient('mongodb://ttony0321:pang0228@3.36.64.214', 27017)
db = client.dbtrello

SECRET_KEY = 'trello'

## HTML 화면 보기


@app.route('/')
def home():
    return render_template('Main.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')

# 로그인 관련 API
#회원가입 API


@app.route('/api/register', methods=['POST'])
def api_register():
   id_receive = request.form['id_give']
   pw_receive = request.form['pw_give']
   nickname_receive = request.form['nickname_give']

   pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

   db.user.insert_one({'id':id_receive,'pw':pw_hash,'nick':nickname_receive})

   return jsonify({'result': 'success'})


#로그인 API
@app.route('/api/login', methods=['POST'])
def api_login():

    id_receive = request.form['login_id']
    pw_receive = request.form['login_pw']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    result = db.user.find_one({'id': id_receive, 'pw': pw_hash})

    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


#유저 정보 확인 API
@app.route('/api/id', methods=['GET'])
def api_valid():
    token_receive = request.headers['token_give']
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)

        userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
        return jsonify({'result': 'success', 'id': userinfo['id'], 'nickname': userinfo['nick']})
    except jwt.ExpiredSignatureError:
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})


# Trello(POST) API
@app.route('/list', methods=['POST'])
def save_list():

    list_receive = request.form['list_title']
    user_id_receive = request.form['user_id']
    doc = {
        'List_title': list_receive,
        'user_id': user_id_receive
    }

    db.List_show.insert_one(doc)

    return jsonify({'result': 'success'})


@app.route('/card', methods=['POST'])
def save_card():

    card_receive = request.form['card_title']
    card_id_receive = request.form['card_id']
    card_uuid_receive = request.form['card_uuid']
    user_id_receive = request.form['user_id']

    doc = {
        'Card_title': card_receive,
        'card_id': card_id_receive,
        'card_uuid': card_uuid_receive,
        'user_id': user_id_receive
    }

    db.Card_show.insert_one(doc)

    return jsonify({'result': 'success'})


@app.route('/card', methods=['PUT'])
def update_card():
    card_receive = request.form['card_title']
    card_id = request.form['card_id']
    card_uuid_receive = request.form['card_uuid']

    db.Card_show.update_one({'card_uuid': card_uuid_receive}, {"$set": {'Card_title': card_receive, 'card_id': card_id}})

    return jsonify({'result': 'success'})


@app.route('/memo', methods=['GET'])
def view_list():
    token_receive = request.headers['token_give']
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    print(payload)

    list_show = list(db.List_show.find({"user_id": payload['id']}, {'_id': 0}))
    return jsonify({'result': 'success', 'list_show': list_show})


@app.route('/memo2', methods=['GET'])
def view_card():
    token_receive = request.headers['token_give']
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    print(payload)
    card_show = list(db.Card_show.find({"user_id": payload['id']}, {'_id': 0}))
    return jsonify({'result': 'success', 'card_show': card_show})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)