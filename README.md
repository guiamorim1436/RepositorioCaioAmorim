# BMW M3 Competition — Scroll-Driven Canvas Experience

Landing page de demonstração cinematográfica desenvolvida para testar e validar o controle interativo de vídeo/sequência de quadros diretamente pela rolagem da página (scroll-driven animation).

Utiliza a sequência real de 192 quadros do BMW M3 acelerando na avenida, renderizados dinamicamente via **HTML5 Canvas** de alto desempenho com sincronização bidirecional em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **React 18 & TypeScript**: Estrutura moderna, tipagem estrita e ciclo de vida limpo.
- **Vite 5**: Build de produção ultrarrápido e Hot Module Replacement (HMR).
- **HTML5 Canvas 2D**: Renderização contínua com `requestAnimationFrame` e interpolação LERP.
- **Tailwind CSS**: Estilização estética automotiva premium dark mode.
- **Lucide React**: Ícones de telemetria e interface.
- **Sharp / WebP**: Otimização sem perdas visuais da sequência original de frames (~270 MB em PNG convertidos para ~12.7 MB em WebP), garantindo carregamento instantâneo e conformidade total com limites de deploy da Vercel.

---

## ⚙️ Arquitetura da Animação

1. **Controle Bidirecional pelo Scroll**:
   - Posição relativa do scroll no container de altura calibrada (`h-[450vh]`) calcula a fração de progresso de `0.0` a `1.0`.
   - Scroll descendente: avança os frames progressivamente de `0` a `191`.
   - Scroll ascendente: retrocede suavemente pelos mesmos quadros.
   - Fim da sequência: trava no quadro 191 antes de transicionar harmoniosamente para as seções de conteúdo.

2. **Interpolação Suave (LERP & RAF)**:
   - Utiliza interpolação linear (`current += (target - current) * 0.28`) dentro de um ciclo `requestAnimationFrame` contínuo.
   - Evita saltos bruscos ou trepidação (*jitter*) mesmo em rolagens rápidas com mouse wheel ou trackpad de alta taxa de amostragem.

3. **Carregamento Inteligente e Anti-Flicker**:
   - **Quadro 1 Imediato**: Exibido instantaneamente para LCP de alta velocidade (sem tela preta).
   - **Carregamento Concorrente Controlado**: Máximo de 6 requisições simultâneas em fila assíncrona, evitando travamento da rede.
   - **Fallback para Frame Vizinho Mais Próximo**: Caso o usuário role rapidamente antes de um frame intermediário carregar por completo, o canvas renderiza o frame mais próximo já disponível, eliminando qualquer flash ou tela preta.

4. **Enquadramento Responsivo Híbrido**:
   - Em smartphones (telas verticais): Enquadramento `cover` nativo que preenche 100% da tela.
   - Em desktops / widescreen (telas horizontais): Camada de iluminação ambiente com desfoque e imagem principal nítida centralizada com vinhetas laterais suaves integradas ao fundo `#07080a`.

---

## 📁 Estrutura do Projeto

```
Bmwlpteste/
├── public/
│   └── frames/                 # 192 frames reais otimizados (frame_000001 a frame_000192)
│       └── manifest.json       # Manifesto descritivo de frames e dimensões
├── scripts/
│   └── prepare-frames.js       # Script de processamento e otimização dos frames
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Cabeçalho com listras BMW M e navegação
│   │   ├── HeroCanvasSection.tsx # Seção principal sticky com Canvas e HUD
│   │   ├── PresentationSection.tsx # Visão geral e estatísticas de destaque
│   │   ├── VehicleOverview.tsx # Bento grid com detalhes mecânicos e modos M
│   │   ├── SpecsSection.tsx    # Ficha técnica demonstrativa
│   │   ├── CtaSection.tsx      # Formulário VIP de demonstração
│   │   └── Footer.tsx          # Rodapé minimalista com disclaimer
│   ├── hooks/
│   │   └── useScrollAnimation.ts # Hook central de Canvas, fila e scroll
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── vercel.json                 # Configurações de build e cache da Vercel
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Como Executar Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar servidor de desenvolvimento
```bash
npm run dev
```
Acesse no navegador: `http://localhost:3000`

### 3. Build de Produção
```bash
npm run build
```

### 4. Testar o Preview de Produção
```bash
npm run preview
```
Acesse: `http://localhost:4173`

---

## 🌐 Publicação na Vercel

O projeto foi totalmente configurado e otimizado para deploy em 1 clique na **Vercel**:

- Arquivo `vercel.json` pré-configurado com headers de cache imutável para os frames (`Cache-Control: public, max-age=31536000, immutable`).
- Peso total de frames de apenas 12.7 MB, perfeitamente dentro dos limites da Vercel.
- Build estático padrão com framework Vite (`dist/`).
