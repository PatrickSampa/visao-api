FROM node:18

WORKDIR /user/src/app

# Instalando dependências do sistema
RUN apt-get update && apt-get install -y python3 python3-pip python3.11-venv

# Copiando os arquivos do projeto
COPY . .

# Instalando pacotes Python em um ambiente virtual
WORKDIR /user/src/app/python
RUN python3 -m venv venv
RUN . venv/bin/activate && pip install --upgrade pip && pip install requests beautifulsoup4

# Voltando para o diretório raiz do projeto
WORKDIR /user/src/app

#Concede permisãp padrão para acessar o arquivo
RUN chmod +x ./python_run_script_in_docker.sh

# Instalando dependências do Node.js
RUN npm install
RUN yarn add cors morgan

# Comando para executar o aplicativo
CMD npm run serve
