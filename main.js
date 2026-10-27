const express = require("express");
const app = express();

app.use(express.json());

app.post("/calcular-agua", (req, res) => {
  const { consumo } = req.body;

  // Validação básica
  if (typeof consumo !== "number" || consumo < 0) {
    return res
      .status(400)
      .json({
        erro: "Por favor, informe um valor de consumo válido e positivo.",
      });
  }

  let valorTotal = 0;

  // Cálculo por faixas de consumo
  if (consumo <= 10) {
    valorTotal = consumo * 3;
  } else if (consumo <= 20) {
    valorTotal = 10 * 3 + (consumo - 10) * 5;
  } else {
    valorTotal = 10 * 3 + 10 * 5 + (consumo - 20) * 8;
  }

  // Identifica se o consumo ultrapassou 30 m³
  const consumoElevado = consumo > 30;

  return res.json({
    consumo_informado: `${consumo} m³`,
    valor_da_conta: `R$ ${valorTotal.toFixed(2)}`,
    classificacao: consumoElevado ? "Consumo elevado" : "Consumo normal",
    alerta: consumoElevado
      ? "Atenção: Seu consumo está acima de 30 m³. Tente economizar água!"
      : null,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API de Consumo de Água rodando em http://localhost:${PORT}`);
});
