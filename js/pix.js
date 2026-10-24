// Gerador de Pix "Copia e Cola" (BR Code estático, padrão Banco Central)
const Pix = (() => {
  const tlv = (id, value) => id + String(value.length).padStart(2, "0") + value;
  const clean = (s, max) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9 ]/g, "").toUpperCase().slice(0, max);

  function crc16(payload) {
    let crc = 0xffff;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  function payload({ chave, nomeRecebedor, cidade, valor, descricao = "", txid = "***" }) {
    const gui = tlv("00", "br.gov.bcb.pix");
    const key = tlv("01", chave.trim());
    const desc = descricao ? tlv("02", clean(descricao, 40)) : "";
    const p =
      tlv("00", "01") +
      tlv("26", gui + key + desc) +
      tlv("52", "0000") +
      tlv("53", "986") +
      (valor ? tlv("54", Number(valor).toFixed(2)) : "") +
      tlv("58", "BR") +
      tlv("59", clean(nomeRecebedor, 25)) +
      tlv("60", clean(cidade, 15)) +
      tlv("62", tlv("05", txid)) +
      "6304";
    return p + crc16(p);
  }
  return { payload, crc16 };
})();
if (typeof module !== "undefined") module.exports = Pix;
