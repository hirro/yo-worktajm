FROM nginx

ADD etc/nginx/conf.d/ssl.conf /etc/nginx/conf.d/ssl.conf

RUN apt-get update && \
	apt-get install -y tcpdump

EXPOSE 443

VOLUME [ "/var/log/nginx" ]

