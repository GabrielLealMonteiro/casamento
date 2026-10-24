# 💍 Site de Casamento — GitHub Pages + Pix

Custo: R$ 0 · Taxa sobre presentes: 0%

## Páginas
| Arquivo | Página |
|---|---|
| index.html | Início: capa, contagem regressiva, cerimônia/festa, informações, confirmação de presença |
| historia.html | Nossa história: capítulos com foto + texto |
| fotos.html | Galeria do pré-wedding (clique para ampliar) |
| presentes.html | Lista de presentes estilizada, com pagamento via Pix |

**Todo o conteúdo fica em `js/config.js`.** Os outros arquivos não precisam ser editados.

## Onde colocar cada foto
```
img/capa.jpg                 → capa da página inicial
img/historia/topo.jpg        → topo da página "Nossa história"
img/historia/1.jpg, 2.jpg…   → uma foto por capítulo
img/prewedding/1.jpg, 2.jpg… → galeria (ajuste "quantidade" no config.js)
img/presentes/xxx.jpg        → foto de cada presente (o nome deve bater com o config.js)
```
⚠️ O GitHub diferencia maiúsculas: `1.JPG` ≠ `1.jpg`. Renomeie para minúsculas.
⚠️ Comprima as fotos antes de enviar (ideal < 500 KB cada) em https://squoosh.app ou https://tinyjpg.com.
O GitHub aceita até 100 arquivos por upload e 25 MB por arquivo pelo navegador.

## Como enviar fotos pelo GitHub
1. Entre na pasta (ex.: `img/prewedding`).
2. **Add file → Upload files** → arraste as fotos → **Commit changes**.

## Presentes
Cada presente no `config.js` aceita: `nome`, `valor`, `categoria`, `descricao`, `foto`, `emoji`,
`destaque` (selo), `cota: true`, `cotasTotal` e `cotasRecebidas` (barra de progresso; quando completa, aparece "Esgotado").
Atualize `cotasRecebidas` à mão conforme os Pix chegarem.

## Planilha (confirmações e presentes)
1. Planilha Google → **Extensões → Apps Script** → cole `google-apps-script/Code.gs` → salvar.
2. **Implantar → Nova implantação → App da Web** (Executar como: Eu · Acesso: Qualquer pessoa).
3. Copie a URL para `googleScriptUrl` no `config.js`.

## Teste antes de divulgar
- Faça um Pix de R$ 1 lendo o QR Code e confira nome e valor.
- Envie uma confirmação de teste e veja se chega na planilha.
