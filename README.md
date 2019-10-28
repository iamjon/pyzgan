# pyzgan
Make my electra mazgan (air conditioner) work with my pi

Yup, another repository that tries to get an electra air conditioner to work.
A/C Screen
![ac-small](https://user-images.githubusercontent.com/617757/67712624-050f2000-f9cd-11e9-99cd-1475d0ed9711.jpg)

Schedule Screen
![sched-small](https://user-images.githubusercontent.com/617757/67712754-40115380-f9cd-11e9-81f1-aef5d008dd82.jpg)


Prerequisites:
-----------------------
* Clone and set up [Electra-AC-Remote](https://github.com/nryhbhue/Electra-AC-Remote) and follow the instructions there
* Set up your raspberry pi to auto connect to your network, and reserve the ip-address in your router
* Install node on your pi. I found [this guide](https://desertbot.io/blog/nodejs-git-and-pm2-headless-raspberry-pi-install) to be very helpful.


Installation on your pi:
-----------------------
* ssh into your pi
* Clone pyzgan
* cd pyzgan 
* nano server/.env :
```
PORT=server_port
NODE_ENV=not_development
DEBUG=false
PATH_TO_ELECTRA=path_to_Electra-AC-Remote_binary
```
* nano client/.env :
```
REACT_APP_API_URL=http://your_pi_ip:server_port
PORT=client_port
```
* cd client/ && npm install
* cd .. && cd server 
    * npm install
    * nano remoteSchedule.json
        * `{"oneTime":[],"scheduled":[]}`
    * nano remoteState.json
         * `{"temp":21,"fan":1,"mode":"heat","power":true}`
* set up start scripts for the client and server
    * sudo systemctl enable pyzganclient.service
    * sudo systemctl enable pyzganserver.service
    
   
Example service files:
-----------------------
[See here for more details](https://www.raspberrypi.org/documentation/linux/usage/systemd.md)    
``` 
[Unit]
Description=Pyzgan Client Service
After=network.target

[Service]
ExecStart=/usr/local/bin/npm start
WorkingDirectory=your_instalation_directory/pyzgan/client
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target

[Unit]
Description=Pyzgan Server Service
After=network.target

[Service]
ExecStart=/usr/local/bin/npm run dev
WorkingDirectory=your_instalation_directory/pyzgan/server
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target    
```  

Related Electra projects:
-----------------------
* https://github.com/nryhbhue/Electra-AC-Remote
* https://github.com/barakwei/IRelectra
* https://github.com/urish/ir-electra
* https://github.com/alonf/ElectraACRemote/tree/master/ElectraACRemote
* https://github.com/dhkron/pyir
* https://github.com/itamaro/home-control-arduino

Related projects and guides:
-----------------------
* https://github.com/GeReV/airconditioner_remote
* https://blog.bschwind.com/2016/05/29/sending-infrared-commands-from-a-raspberry-pi-without-lirc/
* http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/
* https://blog.digilentinc.com/using-a-raspberry-pi-as-a-universal-remote/
* https://www.instructables.com/id/Raspberry-Pi-Zero-Universal-Remote/
* https://raspberrytips.nl/raspberry-pi-infrarood-afstandsbediening-lirc/
* http://www.raspberry-pi-geek.com/Archive/2015/10/Raspberry-Pi-IR-remote
* http://www.harctoolbox.org/IrScrutinizer.html
* https://github.com/z3t0/Arduino-IRremote


