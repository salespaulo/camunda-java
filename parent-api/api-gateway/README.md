# api-gateway

Projeto maven para um api gateway api 

```
$> sudo docker run -d                          \
  	--name <nome_container>                    \
    --network <nome_rede>                      \
    -e "DB_HOST_PORT=<host>:<port>"            \
    -e "CONFIGSERVER_URL=http://<host>:<port>" \
    -e "EUREKASERVER_URL=http://<host>:<port>" \
    -e "LOGSTASH_HOST_PORT=<host>:<port>"      \
    -e "DB_USERNAME=<user>"                    \
    -e "DB_PASSWORD=<password>"                \
    -e "LOGSTASH_HOST_PORT=<host>:<port>"      \
    -p 8080:8080 api-gateway
```
