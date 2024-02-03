# Elementos táticos

Precisamos ser capaz de modelar de forma mais acertiva de forma mais acertiva os seus principais componentes, comportamentos e individualidade, bem como suas relações.

comportamentos refletem as regras de negócios

verificar o que é único nos bounded context, os elementos transversais

# Entidades

Entidade = Identidade

Uma entidade é algo único que é capaz de ser alterado de forma contínua durante um longo período de tempo.

Uma entidade é ago que possui uma continuidade em seu ciclo de vida e pode ser distingui de independente dos atributos que são importantes para a aplicação do usuário. Pode ser uma pessoa, cidade, carro, um ticket de loteria ou uma transação bancária.

Uma entidade sempre deve representar o estado correto e atual do elemento em questão

A entidade deve se auto validar, ou seja, ela deve ser capaz de validar se os dados que estão sendo atribuídos a ela são válidos ou não.

Uma entidade deve possuir para modelagem de domínio rica:
- comportamento
- identidade
- regras de negócio

## Entidade anêmica

Uma entidade anêmica é uma entidade que não possui comportamento, apenas atributos.

## Entidade vs ORM

Uma entidade não deve ser uma entidade de persistência, ou seja, não deve ser uma entidade que é mapeada diretamente para uma tabela no banco de dados.

no dia a dia criamos duas:
- entity: focado no negócio
    - cria dentro da pasta de domínio
    - complexidade de negócio
- models: focado na persistência
    - criar dentro da pasta de infra
    - complexidade acidental

# Value Objects

Value Objects são objetos que representam um valor, ou seja, um objeto que possui um valor único e imutável.

Precisamos ser expressivos na modelagem de domínio, e os value objects nos ajudam a ser mais expressivos.

Requisitos:
- imutabilidade
- auto validação
- não possui identidade

Exemplo:

- Address:
    - não atualizamos o endereço, mudamos de endereço
    - não necessita de um id uma vez que não precisa ser único (depende do contexto)
    - props:
        - street
        - city
        - state
        - zipCode

- CPF:
    - o CPF não é uma string qualquer
    - ele possui um formato específico
    - ele possui um algoritmo de validação
    - props:
        - value

# Agregados

Agregados são um conjunto de entidades e value objects que são tratados como uma unidade para propósito de mudança de dados.

Exemplo:
    - Customer Aggregate
        - Customer (Entity)
            - Customer sempre possui um endereço
        - Address (Value Object)

    - Order Aggregate
        - Order (Entity)
            - Order possui vários itens
            - Precisa de um Customer ID
                - A relação não é forte, o Customer existe independente da Order
        - Item (Entity)
            - Fica dentro da ordem
                - A relação é forte, o Item não existe sem a Order

    - Toda vez que criamos uma order precisamos criar itens
    - Quando criamos um Customer não precisamos criar uma Order

# Domain services

Um domain service é uma operação sem estado que cumpre uma tarefa específica dentro do domínio.

Muitas vezes, a melhor indicação de que voce deve criar um domain Service é quando a operação que você precisa executar parece não se encaixar em nenhuma agregado ou value object.

## Cuidados

- Se tiver muitos domain services, pode indicar que seus agregados estão anêmicos
- Domain services são stateless
    - Podemos criar métodos estáticos umas vez que não precisamos de estado

# Repositórios

Um repositório comumente se refere a um local de armazenamento, geralmente considerado um local de segurança ou preservação dos itens nele armazenados.
Quando você armazena algo em um repositório e depois retorna para recuperá-lo, você espera que o que você recuperou seja o mesmo que o que você armazenou.

- Normalmente se cria um repositório por agregado