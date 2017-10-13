# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route("/")
def login():
    #Användaren loggar in via Facebook
    return "hej"

@app.route("/define")
def defin_search():
    #Användaren får välja stad
    pass

@app.route("/show_all_events")
def show_all_events():
    #Visar alla event utifrån användarens val
    pass

@app.route("/show_event")
def show_event():
    #Visar detaljer för eventet användaren valde: eventbeskrivning + reviews
    pass

