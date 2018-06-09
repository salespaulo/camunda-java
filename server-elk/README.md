# server-elk
Projeto maven para um servidor com LogStash, ElasticSearch e Kibana

```
$> sudo docker run -d       \
    --name <nome_container> \
    --network <nome_rede>   \
    -p 5044:5044            \   
    -p 5045:5045            \
    -p 5601:5601            \
    -p 9200:9200 elk-server
```

## Portas
* 5045 - LogStash TCP Json
* 5044 - LogStash File Beats
* 9200 - Elastic Search
* 5601 - Kibana

