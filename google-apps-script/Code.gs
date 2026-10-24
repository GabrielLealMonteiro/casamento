// Cole este código em: Planilha Google > Extensões > Apps Script
// Depois: Implantar > Nova implantação > App da Web
//   Executar como: Eu | Quem pode acessar: Qualquer pessoa
// Copie a URL gerada para googleScriptUrl (js/config.js)

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const p = e.parameter;
  const agora = new Date();

  if (p.tipo === "PRESENTE") {
    const sh = getSheet(ss, "Presentes", ["Data", "Nome", "Presente", "Cotas", "Valor (R$)", "Mensagem", "Conferido no extrato?"]);
    sh.appendRow([agora, p.nome, p.presente, Number(p.cotas || 1), Number(p.valor), p.mensagem || "", ""]);
  } else {
    const sh = getSheet(ss, "RSVP", ["Data", "Nome", "WhatsApp", "Presença", "Acompanhantes", "Nomes acompanhantes", "Restrições", "Mensagem"]);
    sh.appendRow([agora, p.nome, p.telefone || "", p.presenca, Number(p.acompanhantes || 0),
                  p.nomes_acompanhantes || "", p.restricoes || "", p.mensagem || ""]);
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function getSheet(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}
