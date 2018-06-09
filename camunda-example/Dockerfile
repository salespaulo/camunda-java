FROM openjdk:8-jre-alpine
MAINTAINER Post Scriptum

# Common
ENV TZ America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# SpringBoot
ARG JAR_FILE
ADD ${JAR_FILE} app.jar

VOLUME /tmp
EXPOSE 8765
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Xmx512m","-Xss128m","-jar","app.jar"]
