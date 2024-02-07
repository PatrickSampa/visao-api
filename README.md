## FUNCIONAMENTO DO DOCKER_COMPOSE:
 * o `docker-compose.yml` ele é o docker-compose de produção
  * * Ele sobe o nginx para fazer o balanceamento de carga e mais 5 API do sistema
  * * possui o `restart: always` para sempre o container ficar em produção
  * * comando para usar ele e fazer build e não travar o terminal `docker-compose up --build -d`
  * * Obs: so precisar fazer o build uma vez do container sendo necessário fazer ele de novo caso faça modificação no código
  * * * O `--build` é para fazer o build da imagem do projeto assim para subir os container sem o build basta executar o comando `docker-compose up -d`
    * * * O `-d` é para não travar o terminal, então caso queira subir os container com terminal travado e exibindo os logs do sistema basta executar o comando `docker-compose up`
 * o `docker-compose.dev.yml` ele é o docker-compose de desenvolvimento
  * * Ele sobe somente com API
  * * comando para usar ele e fazer build e não travar o terminal `docker-compose -f docker-compose.dev.yml up --build -d`
  * * Obs: so precisar fazer o build uma vez do container sendo necessário fazer ele de novo caso faça modificação no código
  * * * O `--build` é para fazer o build da imagem do projeto assim para subir os container sem o build basta executar o comando `docker-compose -f docker-compose.dev.yml up -d`
    * * * O `-d` é para não travar o terminal, então caso queira subir os container com terminal travado e exibindo os logs do sistema basta executar o comando `docker-compose -f docker-compose.dev.yml up`