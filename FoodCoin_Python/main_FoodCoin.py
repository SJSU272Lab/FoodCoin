from __future__ import absolute_import

import json
import ast
from flask import jsonify
import os
from urlparse import urlparse

from flask import Flask, render_template, request, Response, redirect, session
import csv

import requests
import Decision_Tree2
import amazon_sns
f = open('data3.csv')
csv_f = csv.reader(f)

input_parameters = []
my_data=[]

for row in csv_f:
    input_parameters.append(row[0])
    input_parameters.append(row[1])
    input_parameters.append(row[2])
    input_parameters.append(row[3])
    input_parameters.append(row[4])
    my_data.append(input_parameters)
    input_parameters = []
app = Flask(__name__)

@app.route('/',methods=['GET'])
def welcome():
	return "Welcome"


@app.route('/calculateQuantity',methods=['POST'])
def insert_expense():
    request_json = request.get_json(force=True)
    inputdata=[]
    inputdata.append(request_json['day'])
    inputdata.append(request_json['daytype'])
    inputdata.append(request_json['dishes'])
    inputdata.append(request_json['guest'])
    #print inputdata
    tree=Decision_Tree2.buildtree(my_data)
    outputdata={}
    outputdata=Decision_Tree2.classify(inputdata,tree)
    print "Result is :"
    print outputdata
    return jsonify(outputdata)

@app.route('/subscribeUser',methods=['POST'])
def subscribeUser():
    request_json = request.get_json(force=True)
    phoneNumber=request_json['PhoneNumber']
    outputdata=amazon_sns.subscribeUser(phoneNumber)
    print outputdata
    return jsonify(outputdata)

@app.route('/publishMsssage',methods=['POST'])
def publishMessages():
    #print "Inside publish message"
    request_json = request.get_json(force=True)
    message=request_json['Message']
    outputdata=amazon_sns.publishMessage(message)
    print outputdata
    return jsonify(outputdata)

@app.route('/sentimentalAnalysis',methods=['POST'])
def analyseSentiments():
    pass




if __name__ == '__main__':
   app.run(host='127.0.0.1',port=8080)