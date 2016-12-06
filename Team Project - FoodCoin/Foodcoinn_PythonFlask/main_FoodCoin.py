
from flask_cors import CORS, cross_origin
from flask import jsonify
import os
from urlparse import urlparse

from flask import Flask, render_template, request, Response, redirect, session

import requests
import Decision_Tree2
import textProcessing
import amazon_sns
import changeCalculator


app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
@cross_origin()
def welcome():
	return "Welcome to foodcoin. CMPE 272"


@app.route('/calculateQuantity',methods=['POST'])
@cross_origin()
def insert_expense():
    request_json = request.get_json(force=True)
    inputdata=[]
    inputdata.append(request_json['day'])
    inputdata.append(request_json['daytype'])
    inputdata.append(request_json['dishes'])
    inputdata.append(request_json['guest'])
    outputdata={}
    outputdata=Decision_Tree2.calculateQuantity(inputdata)
    output= int(outputdata.keys()[0])
    output={"Quantity":output}


    return jsonify(output)

@app.route('/subscribeUser',methods=['POST'])
def subscribeUser():
    request_json = request.get_json(force=True)
    phoneNumber=request_json['PhoneNumber']
    outputdata=amazon_sns.subscribeUser(phoneNumber)
    return jsonify(outputdata)

@app.route('/publishMsssage',methods=['POST'])
def publishMessages():
    request_json = request.get_json(force=True)
    message=request_json['Message']
    outputdata=amazon_sns.publishMessage(message)
    return jsonify(outputdata)

@app.route('/sentimentalAnalysis',methods=['POST'])
@cross_origin()
def analyseSentiments():
    request_json = request.get_json(force=True)
    inputMessage=request_json['Review']
    output=textProcessing.calculate(inputMessage)
    return jsonify(output)
	
@app.route('/inputData',methods=['POST'])
@cross_origin()
def inputTrainData():
    print "Request Received"
    request_json=request.get_json(force=True)
    print request_json
    data=[]
    for i in request_json:
        print i
        list = []
        list.append(i["day"])
        list.append(i["daytype"])
        list.append(i["dishes"])
        list.append(i["guest"])
        list.append(i["quantity"])
        print list
        data.append(list)
    Decision_Tree2.addTrainingData(data)
    return "Added Data"

@app.route('/inputReviews',methods=['POST'])
@cross_origin()
def analyseReviews():
    request_json = request.get_json(force=True)
    print "*********************************************************"
    print request_json
    print "*********************************************************"
    list = []
    for i in request_json:
        print i
        list.append(i["Review"])
    print list
    positive,negative =textProcessing.analyseSentiments(list)
    print negative
    print positive
    output={}
    output["Negative Percent"]=negative
    output["Positive Percent"]=positive
    return jsonify(output)

@app.route('/wasteChange',methods=['GET'])
@cross_origin()
def wasteChanges():
    data=changeCalculator.sendChanges()

    print data
    return jsonify(data)


port = os.getenv('PORT', '5000')
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=int(port))
