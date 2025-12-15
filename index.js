const caixaCheckbox = document.querySelector("#caixa")
const pacotePequenoCheckbox = document.querySelector("#pacotePequeno")
const pacoteMedioCheckbox = document.querySelector("#pacoteMedio")
const pacoteGrandeCheckbox = document.querySelector("#pacoteGrande")
const materiaisDiversosCheckbox = document.querySelector("#materiaisDiversos")

function brToTime(valor) {
  if (!valor) return 0;

  const [h, m] = valor.split(':');

  const horas = Number(h);
  const minutos = Number(m);

  if (isNaN(horas) || isNaN(minutos)) return 0;

  return horas + (minutos / 60);
}
document.querySelectorAll('.time-br').forEach(input => {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 4) v = v.slice(0, 4);
    let h = v.slice(0, 2);
    let m = v.slice(2, 4);
    if (m && Number(m) > 59) m = '59';
    input.value = m ? `${h}:${m}` : h;
  });
});

function brToNumber(valor) {
  if (!valor || valor === 'R$') return 0;

  return Number(
    valor
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  ) || 0;
}
document.querySelectorAll('.numero-br').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value
    let valor = input.value
      .replace(/[^0-9.,]/g, '') 
      .replace(/(\..*)\./g, '$1') 
      .replace(/,(?=.*?,)/g, '')
      input.value = 'R$' + valor;
  });
});

function calcular () {
        const precoFilamento = document.querySelector("#precoFilamento")
        const filamentoGasto = document.querySelector("#filamentoGasto")
        const tempoImpressao = document.querySelector("#tempoImpressao")
        let custos = document.querySelector("#custos")
        let sugestaoValor = document.querySelector("#sugestaoValor")
        const impressoras = document.querySelector("#impressoras")
        const argolas = Number(document.querySelector("#argolas").value)
        
        let valorImpressora;
        let potenciaWattsImpressora;
        let vidaUtilImpressora;
        let valorRoloFilamento = brToNumber(precoFilamento.value)
        const pesoFilamentoGasto = brToNumber(filamentoGasto.value)
        const horasImpressao = brToTime(tempoImpressao.value)
        const precoEnergiaHoraKWH = parseFloat(0.9373500)
        const valorHora = 1
        const valorArgola = 0.6
        
        if(impressoras.value === "BambuLabA1") {
            valorImpressora = 4500
            vidaUtilImpressora = 5000
            potenciaWattsImpressora = 60
        } else if(impressoras.value === "EnderV3KE") {
            valorImpressora = 2500
            vidaUtilImpressora = 3000
            potenciaWattsImpressora = 120
        } else {
            alert("selecione uma impressora")
        }
        
        if (precoFilamento.value === "" || precoFilamento.value === NaN || precoFilamento.value === null) {
            valorRoloFilamento = 120
        }
        
        const custoTempo = horasImpressao * valorHora
        const depreciacaoPorHora = valorImpressora / vidaUtilImpressora
        const depreciacaoTotal = depreciacaoPorHora * horasImpressao
        const custoEnergia = (potenciaWattsImpressora / 1000) * horasImpressao * precoEnergiaHoraKWH;
        const gastoBruto = (pesoFilamentoGasto / 1000) * 
        valorRoloFilamento
        const totalArgolaValor = argolas * valorArgola
        let gastosTotal = gastoBruto + custoEnergia + depreciacaoTotal + custoTempo;

        if (caixaCheckbox.checked) {
            gastosTotal += 4
        }
        if (pacotePequenoCheckbox.checked) {
            gastosTotal += 1
        }
        if (pacoteMedioCheckbox.checked) {
            gastosTotal += 1.2
        }
        if (pacoteGrandeCheckbox.checked) {
            gastosTotal += 1.5
        }
        if(materiaisDiversosCheckbox.checked) {
            gastosTotal += 5
        } 
        if(argolas) {
            gastosTotal += totalArgolaValor
        }
        const sugestaoMinima = gastosTotal * 2
        const sugestaoMedia = sugestaoMinima * 1.2
        const sugestaoMaximo = sugestaoMinima * 1.5
        
        custos.innerHTML = 
        `- Argolas Chaveiro = R$${argolas}<br>
        - Custo por Hora = R$${custoTempo}<br>
        - Depreciação da Impressora = R$${depreciacaoTotal.toFixed(2)}<br>
        - Custo Energia Hora = R$${custoEnergia.toFixed(2)}<br>
        - Gasto Filamento = R$${gastoBruto.toFixed(2)}<br>
        - Total = R$${gastosTotal.toFixed(2)}`
        
        sugestaoValor.innerHTML = `-Valor Minimo = R$${sugestaoMinima.toFixed(2)}<br>
        -Valor Medio = R$${sugestaoMedia.toFixed(2)}<br>
        -Valor Maximo = R$${sugestaoMaximo.toFixed(2)}`

        if (!filamentoGasto.value) {
            alert('Falta o Peso do filamento')
             custos.innerHTML = ""
             sugestaoValor.inrHTML = ""
        }
        if (!tempoImpressao.value) {
            alert('Falta tempo da impressao')
             custos.innerHTML = ""
             sugestaoValor.inrHTML = ""
        }
    }