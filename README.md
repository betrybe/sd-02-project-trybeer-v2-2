# Boas vindas ao repositório do projeto TryBeer v2!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir desse repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

## O que deverá ser desenvolvido

Esse projeto é uma continuação do projeto `Trybeer`! Ou seja, o _commit_ inicial nesse repositório será todo o projeto que foi desenvolvido por vocês anteriormente. Logo, esse será o ponto de partida de vocês para esse projeto.

O grupo continua sendo o mesmo que foi quando vocês desenvolveram o `Trybeer v1`.

Nesse projeto vocês irão desenvolver novas funcionalidades a partir dos conhecimentos adquiridos nos últimos blocos. Além de desenvolver novas funcionalidades, vocês terão também novos desafios, pois algumas demandas farão com que vocês refatorem a arquitetura do projeto.

No projeto `Trybeer v1` vocês utilizaram apenas o banco de dados _MySQL_. Já nesse projeto além do _MySQL_, vocês terão que utilizar o _MongoDB_. Vocês verão com mais detalhes nos requisitos do projeto.

O principal intuito desse projeto é que vocês refatorem alguns pontos do que já foi desenvolvido por vocês. A intenção é refatorar o projeto para, por exemplo, utilizar o _ORM Sequelize_, utilizar a abordagem _DDD_, dentre outras coisas. Novas features deverão ser adicionadas como, por exemplo, a implementação de um chat para estabelecer uma conversa entre o estabelecimento e a pessoa usuária, dentre outras implementações.

Dito tudo isso, vamos para os requisitos para que vocês tenham maiores detalhes do que deve ser desenvolvido nesse projeto!

Você pode acessar um protótipo do front-end [aqui](https://www.figma.com/file/dRYG01MdRnxQr6nlp1wT2o/Trybeer-v2?node-id=0%3A1).

Para servir arquivos estáticos como imagens no back-end, utilize o seguinte path:
`/back-end/public/`

##### ⚠️ Lembre-se de escrever testes unitários e sinta-se livre para alterar a UI. Contudo, respeite os atributos `data-testid`, pois eles serão usados na correção do projeto.

Você pode ler mais sobre os atributos que serão utilizados para testes [neste link](https://www.eduardopedroso.com.br/?p=494).

##### ⚠️ Para ver os comentários sobre cada componente, basta clicar no ícone de comentários no Figma (lado esquerdo superior).

![image](https://res.cloudinary.com/drdpedroso/image/upload/c_scale,w_400/v1575815877/Screenshot_2019-12-08_at_11.37.25_kzt7rl.png)

---

## Desenvolvimento

Esse repositório deve conter, como dito anteriormente, o código desenvolvido por vocês no primeiro projeto `Trybeer`. Após clonar o projeto, faça o _commit_ inicial com todo o código do projeto e comece o desenvolvimento dos requisitos a partir dele.

Para o banco de dados, você deverá utilizar o `MySQL` e o `MongoDB`. Modele-os e utilize, para o `MySQL`, as funcionalidades do _Sequelize_ para que o seu projeto seja corrigido utilizando o banco de dados arquitetado por você!

##### Você também deve **escrever testes unitários que devem cobrir pelo menos 90% do projeto**. Na [documentação do Jest CLI](https://jestjs.io/docs/en/cli) é possível ver como essa cobertura é coletada.

## Requisitos do projeto

⚠️ Lembre-se de que o seu projeto só será avaliado se estiver passando pelos _checks_ do **CodeClimate** e se estiver, também, seguindo corretamente os padrões REST para rotas e DDD para o back-end. Além disso, você deve utilizar das `migrations` e dos `seeders` para a criação do seu banco de dados, das tabelas e inserção de dados iniciais.

O intuito desse app é que uma pessoa possa pedir uma cerveja no aplicativo e outra pessoa possa aceitar esse pedido no **admin**.

⚠️ **Dica**: Ao refatorar e adicionar funcionalidades, não se esqueça de que está respeitando os princípios do SOLID. Atente-se a implementação dos princípios sempre que tiver fazendo alguma alteração no código.

##### O projeto sera composto por duas entregas, cada uma especificada abaixo com seus respectivos requisitos e o prazo decidido com a facilitação.

## Requisitos do projeto

### Testes

1. A cobertura de testes unitários do back-end deve ser de, no mínimo, 90%.

### Sequelize

2. A lógica da regra de negócio da aplicação deve estar centralizada no back-end, ou seja, na API `Node.js`. Com isso, o único lugar que deve conter a lógica será o back-end: o banco de dados e front-end **não devem** conter lógicas de regra de negócio. Ou seja, muito cuidado ao utilizar _triggers_, _procedures_, dentre outras, e muito cuidado com regras de negócio no front-end.

3. O projeto deve passar a utilizar o _ORM Sequelize_ ao invés do driver do _MySQL_.

4. Crie quantos `seeders` e quantas `migrations` quiser. Porém, lembre-se de criar todas as `migrations` necessárias para que o projeto seja gerado 100% funcional utilizando o banco de dados arquitetado por você. O arquivo `.sql`, contendo as _queries_ de criação/configuração do banco, não será mais necessário, visto que o projeto passará a utilizar `migrations` e `seeders`. Estes devem, portanto, ser removidos.

### Status do pedido

5. Todo pedido realizado deve ter um status referente ao seu progresso atual.

6. Os _status_ do pedido devem ser os seguintes:

   - `Pendente` logo quando o pedido for criado;

   - `Preparando` quando o pedido for iniciado pelo usuário admin;

   - `Entregue` quando o pedido terminar.

7. O usuário admin deve ter o controle de alterar o status do pedido. Lembre-se de seguir princípio `Open/Closed` de _SOLID_ para está implementação de forma que possam ser acrescentados novos comportamentos e `status` sem impactar os status já existentes.

8. Qualquer atualização feita no pedido pelo usuário admin deve se refletir em tempo real para o cliente.

### Funcionalidade de chat, visão de cliente

9. Essa funcionalidade só deve existir na **visão de cliente**

10. A plataforma deve ter acessível, no menu lateral, uma funcionalidade de chat denominada `Conversar com a loja`.

    - Um clique no item descrito como `Conversar com a loja` deve levar para uma página de chat.

11. Na página de chat, as mensagens devem aparecer ordenadas com as mais recentes embaixo.

    - A página deve mostrar as mensagens enviadas e recebidas, com as mensagens mais recentes mais embaixo.

    - A página deve ter um input para envio de nova mensagem ao chat.

12. O nickname de cliente deve ser o email cadastrado.

13. O histórico da conversa deve ser salvo no banco de dados `MondoDB` e aparecer quando a pessoa abre a página.

### Funcionalidade de chat, visão de admin

14. Essa funcionalidade só deve existir na **visão de admin**

15. A plataforma deve ter acessível, no menu lateral, uma funcionalidade de chats denominada `Conversas`.

    - Um clique no botão `Conversas` direciona para uma página que lista todas as conversas da loja.

    - As conversas devem aparecer numa lista. Cada conversa deve ser identificada pelo email da pessoa cliente em questão.

    - Caso não tenham conversas, deve ser exibido o texto "Nenhuma conversa por aqui".

16. Um clique num item da lista de conversas deve exibir na tela o respectivo chat.

    - Um clique em um item da lista deve exibir na tela a janela com o chat daquela conversa.

    - O _nickname_ da loja na conversa deve ser "Loja".

    - A página da conversa deve mostrar, no topo da tela, o email do usuário que a Loja está conversando.

    - A página da conversa deve ter um botão de voltar que ao ser clicado redireciona a pessoa a página de listagem de conversas novamente.

17. O histórico de cada conversa deve ser salvo no banco de dados e aparecer quando a pessoa abre a página.

18. A lista de conversas deve ser ordenada pela data da última mensagem.

    - A lista de conversas deve ser ordenada pela data da última mensagem (recebida ou enviada), as mais recentes no topo da lista.

## Bônus

### Funcionalidade de chat, visão de admin: envio de mensagens em broadcast

19. Essa funcionalidade só deve existir na **visão de admin**

20. Na página de chats deve haver um botão identificado com `Nova linha de transmissão`:

    - Ao clicar no botão, deve-se disponibilizar a lista de conversas disponíveis e, ao lado de cada uma, deve haver uma checkbox;

    - O usuário admin da loja deve ser capaz de selecionar as checkboxes das conversas que quiser e, através de um input, enviar uma mesma mensagem a todas essas conversas ao mesmo tempo;

    - A página deve fazer uma validação para garantir que, no momento desse envio, ao menos uma conversa esteja selecionada.

### Deploy Heroku

21. Faça _scripts bash_ contendo a sequência de comandos necessários para realizar o deploy via Heroku tanto para o **front-end** quanto para o **back-end**. Os scripts devem ter os seguintes nomes:

    - `deploy-front-end.sh`;

    - `deploy-back-end.sh`.

### Monitoramento do Back-End

22. Faça um _script bash_ contendo a sequência de comandos necessários para realizar o monitoramento da `API` via _PM2_. O script deve ter o seguinte nome:

    - `monitoring-run.sh`.

### Testes

23. A cobertura de testes unitários do front-end deve ser de, no mínimo, 90%.

---# Boas vindas ao repositório do projeto TryBeer v2!!!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir desse repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

## O que deverá ser desenvolvido

Esse projeto é uma continuação do projeto `Trybeer`! Ou seja, o _commit_ inicial nesse repositório será todo o projeto que foi desenvolvido por vocês anteriormente. Logo, esse será o ponto de partida de vocês para esse projeto.

O grupo continua sendo o mesmo que foi quando vocês desenvolveram o `Trybeer v1`.

Nesse projeto vocês irão desenvolver novas funcionalidades a partir dos conhecimentos adquiridos nos últimos blocos. Além de desenvolver novas funcionalidades, vocês terão também novos desafios, pois algumas demandas farão com que vocês refatorem a arquitetura do projeto.

No projeto `Trybeer v1` vocês utilizaram apenas o banco de dados _MySQL_. Já nesse projeto além do _MySQL_, vocês terão que utilizar o _MongoDB_. Vocês verão com mais detalhes nos requisitos do projeto.

O principal intuito desse projeto é que vocês refatorem alguns pontos do que já foi desenvolvido por vocês. A intenção é refatorar o projeto para, por exemplo, utilizar o _ORM Sequelize_, utilizar a abordagem _DDD_, dentre outras coisas. Novas features deverão ser adicionadas como, por exemplo, a implementação de um chat para estabelecer uma conversa entre o estabelecimento e a pessoa usuária, dentre outras implementações.

Dito tudo isso, vamos para os requisitos para que vocês tenham maiores detalhes do que deve ser desenvolvido nesse projeto!

Você pode acessar um protótipo do front-end [aqui](https://www.figma.com/file/dRYG01MdRnxQr6nlp1wT2o/Trybeer-v2?node-id=0%3A1).

Para servir arquivos estáticos como imagens no back-end, utilize o seguinte path:
`/back-end/public/`

##### ⚠️ Lembre-se de escrever testes unitários e sinta-se livre para alterar a UI. Contudo, respeite os atributos `data-testid`, pois eles serão usados na correção do projeto.

Você pode ler mais sobre os atributos que serão utilizados para testes [neste link](https://www.eduardopedroso.com.br/?p=494).

##### ⚠️ Para ver os comentários sobre cada componente, basta clicar no ícone de comentários no Figma (lado esquerdo superior).

![image](https://res.cloudinary.com/drdpedroso/image/upload/c_scale,w_400/v1575815877/Screenshot_2019-12-08_at_11.37.25_kzt7rl.png)

---

## Desenvolvimento

Esse repositório deve conter, como dito anteriormente, o código desenvolvido por vocês no primeiro projeto `Trybeer`. Após clonar o projeto, faça o _commit_ inicial com todo o código do projeto e comece o desenvolvimento dos requisitos a partir dele.

Para o banco de dados, você deverá utilizar o `MySQL` e o `MongoDB`. Modele-os e utilize, para o `MySQL`, as funcionalidades do _Sequelize_ para que o seu projeto seja corrigido utilizando o banco de dados arquitetado por você!

##### Você também deve **escrever testes unitários que devem cobrir pelo menos 90% do projeto**. Na [documentação do Jest CLI](https://jestjs.io/docs/en/cli) é possível ver como essa cobertura é coletada.

## Requisitos do projeto

⚠️ Lembre-se de que o seu projeto só será avaliado se estiver passando pelos _checks_ do **CodeClimate** e se estiver, também, seguindo corretamente os padrões REST para rotas e DDD para o back-end. Além disso, você deve utilizar das `migrations` e dos `seeders` para a criação do seu banco de dados, das tabelas e inserção de dados iniciais.

O intuito desse app é que uma pessoa possa pedir uma cerveja no aplicativo e outra pessoa possa aceitar esse pedido no **admin**.

⚠️ **Dica**: Ao refatorar e adicionar funcionalidades, não se esqueça de que está respeitando os princípios do SOLID. Atente-se a implementação dos princípios sempre que tiver fazendo alguma alteração no código.

##### O projeto sera composto por duas entregas, cada uma especificada abaixo com seus respectivos requisitos e o prazo decidido com a facilitação.

## Requisitos do projeto

### Testes

1. A cobertura de testes unitários do back-end deve ser de, no mínimo, 90%.

### Abordagem DDD e Sequelize

2. A lógica da regra de negócio da aplicação deve estar centralizada no back-end, ou seja, na API `Node.js`. Com isso, o único lugar que deve conter a lógica será o back-end: o banco de dados e front-end **não devem** conter lógicas de regra de negócio. Ou seja, muito cuidado ao utilizar _triggers_, _procedures_, dentre outras, e muito cuidado com regras de negócio no front-end.

3. O projeto deve passar a utilizar o _ORM Sequelize_ ao invés do driver do _MySQL_.

4. Crie quantos `seeders` e quantas `migrations` quiser. Porém, lembre-se de criar todas as `migrations` necessárias para que o projeto seja gerado 100% funcional utilizando o banco de dados arquitetado por você. O arquivo `.sql`, contendo as _queries_ de criação/configuração do banco, não será mais necessário, visto que o projeto passará a utilizar `migrations` e `seeders`. Estes devem, portanto, ser removidos.

### Status do pedido

5. Todo pedido realizado deve ter um status referente ao seu progresso atual.

6. Os _status_ do pedido devem ser os seguintes:

   - `Pendente` logo quando o pedido for criado;

   - `Preparando` quando o pedido for iniciado pelo usuário admin;

   - `Entregue` quando o pedido terminar.

7. O usuário admin deve ter o controle de alterar o status do pedido. Lembre-se de seguir princípio `Open/Closed` de _SOLID_ para está implementação de forma que possam ser acrescentados novos comportamentos e `status` sem impactar os status já existentes.

8. Qualquer atualização feita no pedido pelo usuário admin deve se refletir em tempo real para o cliente.

### Funcionalidade de chat, visão de cliente

9. Essa funcionalidade só deve existir na **visão de cliente**

10. A plataforma deve ter acessível, no menu lateral, uma funcionalidade de chat denominada `Conversar com a loja`.

    - Um clique no item descrito como `Conversar com a loja` deve levar para uma página de chat.

11. Na página de chat, as mensagens devem aparecer ordenadas com as mais recentes embaixo.

    - A página deve mostrar as mensagens enviadas e recebidas, com as mensagens mais recentes mais embaixo.

    - A página deve ter um input para envio de nova mensagem ao chat.

12. O nickname de cliente deve ser o email cadastrado.

13. O histórico da conversa deve ser salvo no banco de dados `MondoDB` e aparecer quando a pessoa abre a página.

### Funcionalidade de chat, visão de admin

14. Essa funcionalidade só deve existir na **visão de admin**

15. A plataforma deve ter acessível, no menu lateral, uma funcionalidade de chats denominada `Conversas`.

    - Um clique no botão `Conversas` direciona para uma página que lista todas as conversas da loja.

    - As conversas devem aparecer numa lista. Cada conversa deve ser identificada pelo email da pessoa cliente em questão.

    - Caso não tenham conversas, deve ser exibido o texto "Nenhuma conversa por aqui".

16. Um clique num item da lista de conversas deve exibir na tela o respectivo chat.

    - Um clique em um item da lista deve exibir na tela a janela com o chat daquela conversa.

    - O _nickname_ da loja na conversa deve ser "Loja".

    - A página da conversa deve mostrar, no topo da tela, o email do usuário que a Loja está conversando.

    - A página da conversa deve ter um botão de voltar que ao ser clicado redireciona a pessoa a página de listagem de conversas novamente.

17. O histórico de cada conversa deve ser salvo no banco de dados e aparecer quando a pessoa abre a página.

18. A lista de conversas deve ser ordenada pela data da última mensagem.

    - A lista de conversas deve ser ordenada pela data da última mensagem (recebida ou enviada), as mais recentes no topo da lista.

## Bônus

### Funcionalidade de chat, visão de admin: envio de mensagens em broadcast

19. Essa funcionalidade só deve existir na **visão de admin**

20. Na página de chats deve haver um botão identificado com `Nova linha de transmissão`:

    - Ao clicar no botão, deve-se disponibilizar a lista de conversas disponíveis e, ao lado de cada uma, deve haver uma checkbox;

    - O usuário admin da loja deve ser capaz de selecionar as checkboxes das conversas que quiser e, através de um input, enviar uma mesma mensagem a todas essas conversas ao mesmo tempo;

    - A página deve fazer uma validação para garantir que, no momento desse envio, ao menos uma conversa esteja selecionada.

### Deploy Heroku

21. Faça _scripts bash_ contendo a sequência de comandos necessários para realizar o deploy via Heroku tanto para o **front-end** quanto para o **back-end**. Os scripts devem ter os seguintes nomes:

    - `deploy-front-end.sh`;

    - `deploy-back-end.sh`.

### Monitoramento do Back-End

22. Faça um _script bash_ contendo a sequência de comandos necessários para realizar o monitoramento da `API` via _PM2_. O script deve ter o seguinte nome:

    - `monitoring-run.sh`.

### Testes

23. A cobertura de testes unitários do front-end deve ser de, no mínimo, 90%.

---
