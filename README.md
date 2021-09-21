# smart_recorder_app
Aplicativo mobile que possibilita economia de energia através do empoderamento do consumidor lhe fornecendo dados do seu consumo em tempo real.

# Testando sem precisar rodar o projeto
Para testar o aplicativo em celulares android, basta baixar o [apk](https://github.com/devsamukaa/smart_recorder_app/raw/main/apk/gotech-v2.apk) e instalá-lo em seu celular ou emulador Android.

# Rodando o projeto
1. Realize o clone do repositório
2. Execute o comando ```npm install``` dentro da pasta raiz ```/smart_recorder_app```
3. Abra a pasta ```/smart_recorder_app/ios```e execute o comando ```pod install```
  * Se for executá-lo em um dispositivo *Android*, certifique-se que tenha um dispositivo android conectado e com permissão de debug por USB, volte para a pasta raiz ```smart_recorder_app``` e execute o comando ```react-native run-android```
  * Se for executá-lo em um dispositivo *IOS*, volte para a pasta raiz e execute ```react-native run-ios```

# Conhecendo e testando nossa solução
## Nota Importante
Ao realizar o login ou o cadastro, **_aguarde em torno de 20s_** para a conclusão da chamada após submeter os dados.

Isso ocorre devido a termos hospedamos nosso backend no heroku, que possui o comportamento de "dormir" após alguns momentos sem requisição, e demora esse tempo para subir novamente e executar as chamadas rest's. 

Após esse período, as chamadas são executadas quase que instantâneamente.
## Outras informações e credenciais para login
Para conhecer e testar todas as funcionalidades, inclusive a de cadastro e esquecimento de senha, além dos cadastros que são realizados dentro da área logada, você pode desejar criar uma conta no nosso app.

Caso queira pular a etapa de cadastro e conhecer apenas as principais funcionalidades da área logada, basta realizar o login com as seguintes credenciais abaixo:

*Login:* samuel.rocha.tj@outlook.com

*Password:* gotech@123

Abraços! 
Time GoTech! 😄
