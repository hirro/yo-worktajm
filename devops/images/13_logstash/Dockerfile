FROM logstash:1.5

ADD etc/logstash/logstash.conf /etc/logstash/logstash.conf
ADD etc/logstash/logstash.crt /etc/logstash/logstash.crt
ADD etc/logstash/logstash.key /etc/logstash/logstash.key

ADD patterns/nginx /opt/logstash/patterns/nginx
ADD etc/logstash/conf.d/11-nginx.conf /etc/logstash/conf.d/11-nginx.conf


