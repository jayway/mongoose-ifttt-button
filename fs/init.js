/*
  App for button on ESP8266 D1 mini which triggers an IFTTT action using Maker Webhook
  Pin diagram: https://escapequotes.net/esp8266-wemos-d1-mini-pins-and-diagram/
*/

load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('api_http.js');

let led = 2;
let btnOn = 14; //D5 on Wemos D1 mini board
let btnOff = 12; //D6
let url_on = 'http://maker.ifttt.com/trigger/sonoff_on/with/key/lFw9T6aZOBxtYKqNZYrAp9MdOrYHlxqznsgGiWZFAj4';
let url_off = 'https://maker.ifttt.com/trigger/sonoff_off/with/key/lFw9T6aZOBxtYKqNZYrAp9MdOrYHlxqznsgGiWZFAj4';

// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
Timer.set(1000 /* 1 sec */, Timer.REPEAT, function() {
  GPIO.toggle(led);
}, null);

GPIO.set_button_handler(14, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
    print('On button pressed');
		act(url_on);
		
}, null);

GPIO.set_button_handler(12, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  print('Off button pressed');
		act(url_off);
		
}, null);

function act(url) {
   let topic = '/devices/' + Cfg.get('device.id') + '/events';
  let message = 'this is a msg';
  HTTP.query({
		url: url,
		headers: { 'Content-Type': 'application/json'},
		data: {
			'value1': 'MOS Test',
			'value2': topic,
			'value3': message},
		success: function(body, full_http_msg) { print( "**HTTPS Sent: ", body); },
		error: function(err) { print("**HTTPS Error: ", err); },  // Optional
	});
}

// Monitor network connectivity.
Event.addGroupHandler(Net.EVENT_GRP, function(ev, evdata, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  print('== Net event:', ev, evs);
}, null);
