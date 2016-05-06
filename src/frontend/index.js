import React from 'react'
import feathers from 'feathers'
import IO from 'socket.io-client'
import FIO from 'feathers-socketio'

import './store'
import geolocator from './models/geolocation'

const test = () => console.log('testing')

const socket = IO()
const app = feathers()

app.configure(FIO(socket))

const messages = app.service('messages')

messages.on('created', function (message) {
  console.log('app', 'message created  ' + Math.random())
})

messages.create({ text: "message  " + Math.random() })


const trigger = document.getElementById('trigger')
const viewport = document.getElementById('viewport')

console.log(geolocator)

trigger.addEventListener('click', () => geolocator.actions.getLocation())
geolocator.subscribe(geolocator.selectors.location, loc => viewport.innerHTML = JSON.stringify(loc) )
geolocator.subscribe(geolocator.selectors.waiting, waiting => {
    if (!!waiting) console.log('waiting for location data')
    else console.log('done waiting for location data')
})

export default test
