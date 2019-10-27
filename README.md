# pyzgan
Make my electra mazgan (air conditioner) work with my pi

Yup, another repository that tries to get an electra airconditioner to work.

Pre-requistes:
-----------------------
* Clone and set up "Electra-AC-Remote" and follow the instructions there
* Set up your raspberry pi to auto connect to your network, and reserve the ip-address in your router


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
    
    
    
    

The inspiration:
https://github.com/nryhbhue/Electra-AC-Remote
https://github.com/barakwei/IRelectra
https://github.com/urish/ir-electra
https://github.com/dhkron/pyir
https://github.com/itamaro/home-control-arduino
