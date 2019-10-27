# pyzgan
Make my electra mazgan (air conditioner) work with my pi

Yup, another repository that tries to get an electra airconditioner to work.

Pre-requistes:
-----------------------
* Clone and set up "Electra-AC-Remote" and follow the instructions there
* Set up your raspberry pi to auto connect to your network, and reserve the ip-address in your router
* Install node on your pi https://desertbot.io/blog/nodejs-git-and-pm2-headless-raspberry-pi-install


Installation:
-----------------------
* ssh into your pi
* Clone pyzgan
* cd pyzgan 
* nano server/.env
    * `PORT=server_port`
* nano client/.env
    * `REACT_APP_API_URL=http://your_pi_ip:server_port`
    * `PORT=client_port`
* cd client/ && npm install
* cd .. && cd server/ && npm install
    
    
    
    

Inspiration and related projects:
-----------------------
* https://github.com/nryhbhue/Electra-AC-Remote
* https://github.com/barakwei/IRelectra
* https://github.com/urish/ir-electra
* https://github.com/dhkron/pyir
* https://github.com/itamaro/home-control-arduino
* https://github.com/GeReV/airconditioner_remote
* https://blog.bschwind.com/2016/05/29/sending-infrared-commands-from-a-raspberry-pi-without-lirc/
* http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/
* https://blog.digilentinc.com/using-a-raspberry-pi-as-a-universal-remote/
* https://www.instructables.com/id/Raspberry-Pi-Zero-Universal-Remote/
* https://raspberrytips.nl/raspberry-pi-infrarood-afstandsbediening-lirc/
* http://www.raspberry-pi-geek.com/Archive/2015/10/Raspberry-Pi-IR-remote
* http://www.harctoolbox.org/IrScrutinizer.html
* https://github.com/z3t0/Arduino-IRremote


