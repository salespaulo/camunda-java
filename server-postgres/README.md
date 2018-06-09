# server-postgres

Projeto maven para criar a imagem do banco de dados para o camunda

```
$> sudo docker run -d           \
    --name <nome_container>     \
    --network <nome_rede>       \
    -e "DB_USERNAME=<username>" \
    -e "DB_PASSWORD=<password>" \
    -e "DB_NAME=<database>" \
    -p 5432:5432 server-postgres
```

