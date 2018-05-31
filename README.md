# IoT button with Mongoose OS and IFTTT
A simple app running on Wemos D1 mini with two buttons connected. 
Each button triggers an HTTPS request to a webhook on IFTTT which acts as a trigger for the applet. 

> **This app requires Mongoose OS installed. See [this](https://github.com/jayway/urban-farming-mongoose "urban-farming-mongoose") reposity how to get started** 

## Hardware
This repo shell is setup with Wemos D1 Mini and the pins are mapped accordingly. If another board is used, just look up which other pins to use. 
Two simple spider buttons are used for the input pins to read low. Connect one of the bottom legs to ground, and one of the upper legs to the button input. When the button is pressed, the 4 legs are connected, i.e. the input will be connected to ground, and a button press is registered. 

## IFTTT
Create an account or sign in using Google or Facebook. 
Search for the Maker webhook and connect the service to your IFTTT account. 
Create a trigger on IFTTT and use _trigger_on_ as key. As an action to this trigger, take anything from the list, for example turn on Hue lamp, Ewelink Sonoff smart power outlet, email etc. 
When done, go to the settings for the Maker service, copy the url and paste it in another browswer tab. In the input field for key, add same key as the one on IFTTT, _trigger_on_. Copy the generated https url and paste it in init.js file.

Do the same but for the 'off' button on the board. 

## Coding
Only the url from the previous step needs to be modified. 
