BOOT2DOCKER
===========

# How to expose accessible ports to other computers on the network

1. Open virtual box.
2. Select the Docker VM
3. Right click "Settings..."
4. Select the "Network" tab.
5. On "Adapter 1" tab, click "Port Forwarding"
6. For each port to be exposed to others:
6.1. Click "+" and enter "kibana", <default (TCP)>, "" (Host IP), 5601, "" (Guest IP), 5601
6.2. Click "+" and enter "nginx", <default (TCP)>, "" (Host IP), 10443, "" (Guest IP), 443
7. Verify that the urls work 
7.1. "http://$HOST_IP:5601"
7.2. "https://$HOST_IP:10443"

