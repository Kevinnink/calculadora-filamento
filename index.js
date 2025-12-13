const caixaCheckbox = document.querySelector("#caixa")
const pacotePequenoCheckbox = document.querySelector("#pacotePequeno")
const pacoteMedioCheckbox = document.querySelector("#pacoteMedio")
const pacoteGrandeCheckbox = document.querySelector("#pacoteGrande")
const materiaisDiversosCheckbox = document.querySelector("#materiaisDiversos")

console.log(typeof materiaisDiversosCheckbox);


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
        let valorRoloFilamento = Number(precoFilamento.value)
        const pesoFilamentoGasto = Number(filamentoGasto.value)
        const horasImpressao = parseFloat(tempoImpressao.value)
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
        - Gasto Filamento = R$${gastoBruto}<br>
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