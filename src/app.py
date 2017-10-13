# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request, render_template
import test

app = Flask(__name__)

@app.route("/")
def login():
    #Användaren loggar in via Facebook
    hej = test.test()
    return render_template("login.html", hej=hej)

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

