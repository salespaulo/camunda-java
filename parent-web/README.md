#### parent-web

Projeto maven para aplicaçoes web

```
$> sudo docker run -d                           \
    --name <nome_container>                     \
    --network <nome_rede>                       \
    -e "GATEWAYSERVER_URL=http://<host>:<port>" \
    -p 9090:9090 parent-web
```
