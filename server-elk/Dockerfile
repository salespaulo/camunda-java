FROM sebp/elk
MAINTAINER Post Scriptum

# Common
ENV TZ America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD ./01-tcp-input.conf /etc/logstash/conf.d/01-tcp-input.conf

EXPOSE 5045
