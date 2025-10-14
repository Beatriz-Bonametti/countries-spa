# Countries Explorer

Aplicação web desenvolvida em *React.js* com *Vite* para explorar informações de países utilizando a *REST Countries API*.  
Permite buscar países por *nome, **código (alpha-2/3)* ou *região*, com ordenação e filtros dinâmicos.

---

## Deploy
O projeto está hospedado na *Vercel*:  
🔗 [Acessar aplicação online](https://countries-spa-zeta.vercel.app/)

---

## Funcionalidades
- Buscar países pelo nome, código ou região  
- Exibir bandeira, capital, população e códigos ISO  
- Ordenar resultados por nome ou população  
- Filtrar por população mínima  
- Feedback visual de carregamento e erros  

---

## Hooks e Gerenciamento de Estado
- *useReducer* → gerencia o estado global da aplicação (buscas, erros, status, resultados)  
- *useMemo* → otimiza filtros e ordenações da lista de países  
- *useForm (react-hook-form)* → controla e valida o formulário de busca  

---

## Principais Bibliotecas
| Biblioteca | Função |
|-------------|--------|
| *React.js* | Biblioteca principal para criação da interface |
| *Vite* | Ferramenta de build e ambiente de desenvolvimento |
| *Material UI (MUI)* | Componentes visuais modernos e responsivos |
| *React Hook Form* | Manipulação e controle do formulário |
| *Yup* | Validação dos campos do formulário |
| *REST Countries API* | Fonte de dados (https://restcountries.com) |

---

### Estrutura do projeto 
- src/components → contém todos os componentes, hooks, validações e serviços.
- src/contexts → contém a Context API (AppContext, useReducer, etc).
- Biblioteca de UI: Material UI (MUI).
- Formulário com validação via Yup + React Hook Form (antes da chamada à API).

## Instalação local

1. Clone o repositório:
   ```bash
   git clone https://github.com/Beatriz-Bonametti/countries-spa.git
