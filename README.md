# TDA Team Dourado — Site Institucional

Site institucional estático (HTML + CSS + JS puro) para a **TDA Team Dourado Academia**.

> **Slogan:** Força · Disciplina · Evolução
> **Localização:** Rua Ribeiro de Vasconcelos, 150 — Jardim Joamar — São Paulo/SP

---

## 📁 Estrutura de Pastas

```
tda-team-dourado/
├── index.html              # Página única com todas as seções
├── css/
│   └── style.css          # Estilos (paleta preta + roxa)
├── js/
│   └── script.js          # Interações (menu, scroll, lightbox, JSON-LD)
├── assets/
│   └── imagens/
│       ├── logo.png       # Logo oficial
│       ├── hero.jpg       # Foto principal do Hero
│       ├── saude.jpg
│       ├── inspiracao.jpg
│       ├── estrutura-musculacao.jpg
│       ├── estrutura-cardio.jpg
│       ├── decorativo-1.png  # (reservado — não utilizado)
│       ├── decorativo-2.png  # (reservado — não utilizado)
│       └── decorativo-3.png  # (reservado — não utilizado)
└── README.md
```

---

## 🎨 Identidade Visual

- **Paleta:** preto profundo `#0A0A0A` + **roxo elétrico** `#8A2BE2` (cor oficial da TDA)
  - Variações: `#6A1FB8` (escuro), `#B388F9` (claro)
- **Tipografia:**
  - **Títulos:** Anton (Google Fonts) — visual esportivo, condensado
  - **Corpo:** Montserrat (Google Fonts) — moderna, legível
- **Conceito:** Força · Disciplina · Evolução

---

## ✏️ Configuração Central

Toda personalização de canais de contato está concentrada em **um único ponto**, no topo de `js/script.js`:

```js
const CONFIG = {
    whatsapp: '5511949132603',
    whatsappMessage: 'Olá! Vim pelo site da TDA Team Dourado e gostaria de saber mais sobre a academia.',
    instagram: 'https://www.instagram.com/teamdouradoacademia',
};
```

O JS gera automaticamente todos os links de WhatsApp e Instagram do site (header, hero, contato, footer, botão flutuante). Basta editar essas linhas para atualizar todos os pontos.

---

## 📞 Canais Configurados

- **WhatsApp:** `(11) 94913-2603` — confirmado e ativo
- **Instagram:** [@teamdouradoacademia](https://www.instagram.com/teamdouradoacademia) — confirmado e ativo
- **Telefone para ligação:** mesmo número do WhatsApp (`+55 11 94913-2603`)

---

## ⚠️ Informações Ainda a Confirmar com a Academia

O site está pronto, mas alguns dados dependem de confirmação direta com a TDA:

### 👥 Equipe
- A seção **"Nossa Equipe"** está com placeholder genérico. Quando a academia enviar **nomes, fotos e cargos**, substituir o bloco `equipe__placeholder` em `index.html` por cards individuais.

### 💬 Depoimentos
- A seção **"Por que escolher a TDA"** usa 4 frases genéricas. Quando houver **depoimentos reais com autorização dos alunos**, substituir os itens da lista `.escolher__list`.

### 🕐 Horário de Funcionamento
- O JSON-LD (`Schema.org/HealthClub`) já tem horários sugeridos (Seg-Sex 06:00-22:00, Sáb 08:00-14:00). **Confirmar com a academia** e ajustar no bloco `<script type="application/ld+json">` em `index.html`.

### 📍 Coordenadas Geográficas
- O JSON-LD usa coordenadas aproximadas de Jardim Joamar (-23.4483, -46.7825). **Refinar com o ponto exato da academia** se a academia desejar que o Google Maps aponte para a entrada.

### 💰 Planos / Preços
- Não foram informados. O site atual **não exibe preços**. Se a academia compartilhar, criar uma nova seção.

### 🌐 Domínio Oficial
- O JSON-LD e `og:image` referenciam `https://tdateamdourado.com.br` (placeholder). **Substituir pelo domínio real** quando o site for publicado.

---

## 🔍 SEO Implementado

- **Meta tags completas:** title, description, keywords, author, robots, color-scheme
- **Open Graph:** og:title, og:description, og:type, og:locale
- **JSON-LD (Schema.org):** tipo `HealthClub` com endereço, telefone, geo, horários, redes sociais
- **HTML semântico:** `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **`lang="pt-BR"`** no `<html>`
- **Tema escuro:** `<meta name="color-scheme" content="dark">` + `theme-color`

### Para Refinar (opcional)
- Adicionar `og:image`, `og:url` com URL real do site publicado
- Adicionar `<link rel="canonical" href="...">` quando houver domínio
- Criar `robots.txt` e `sitemap.xml` na raiz

---

## ♿ Acessibilidade

- Contraste alto (roxo sobre preto)
- Foco visível em todos os elementos interativos (`:focus-visible`)
- `aria-label` em botões só com ícone
- Menu mobile com `aria-expanded` e `aria-controls`
- Lightbox com `role="dialog"` e `aria-modal="true"`
- Suporte completo a `prefers-reduced-motion`
- Textos alternativos em todas as imagens
- Estrutura hierárquica de cabeçalhos: 1× `<h1>`, 9× `<h2>`, 10× `<h3>`

---

## 📱 Responsividade

Testado em breakpoints:
- **Mobile pequeno:** 320px — 480px
- **Mobile grande / Tablet:** 481px — 768px
- **Tablet grande:** 769px — 1024px
- **Desktop:** 1025px+

---

## ⚡ Recursos Interativos

- Menu hambúrguer mobile com fechamento ao clicar no link / tecla ESC
- Scroll suave entre seções (considera altura do header)
- Fade-in animado ao rolar a página (IntersectionObserver)
- Link ativo no menu conforme scroll (IntersectionObserver)
- Botão flutuante WhatsApp com animação de pulso
- Galeria com **lightbox** (clique para ampliar, ESC/X para fechar, setas ou swipe para navegar)
- Header com blur + sombra ao rolar
- Respeita `prefers-reduced-motion` (desativa parallax e animações)

---

## 🚀 Como Abrir

Basta dar **duplo clique** no arquivo `index.html` — funciona direto no navegador, sem build, sem servidor, sem dependências externas (além das fontes do Google Fonts).

## 🌐 Hospedagem Gratuita Sugerida

| Serviço | Como usar |
|---------|-----------|
| **Netlify** | Arrastar a pasta `tda-team-dourado` em https://app.netlify.com/drop |
| **Vercel** | Conectar repositório Git ou arrastar a pasta |
| **GitHub Pages** | Subir para repositório e ativar Pages em Settings |
| **InfinityFree** | Upload via FTP para hospedagem tradicional |

---

## 🔧 Manutenção

Para personalizar a academia sem mexer no código espalhado:

1. **WhatsApp:** editar `whatsapp` em `js/script.js` (linha 15)
2. **Instagram:** editar `instagram` em `js/script.js` (linha 18)
3. **Mensagem padrão do WhatsApp:** editar `whatsappMessage` em `js/script.js` (linha 16)
4. **Endereço, telefone, horários (SEO):** editar JSON-LD no `<head>` de `index.html`
5. **Textos das seções:** editar diretamente em `index.html`
6. **Cores:** editar variáveis em `:root` no topo de `css/style.css` (linhas 15-19)

---

**© 2026 TDA Team Dourado — Todos os direitos reservados.**
