const tipAmountLabel = document.querySelector('#tipAmountLabel')
const totalLabel = document.querySelector('#totalLabel')

const inputBill = document.querySelector('#inputBill')
const inputPeople = document.querySelector('#peopleCount')
const customTip = document.querySelector('#customTip')
const tips = document.querySelectorAll('.options > button')

const getBill = () => {
  return parseFloat(inputBill.value)
}

const getTip = () => {
  const selected = document.querySelector('.selected')
  let tip = 0
  if (selected) {
    tip = parseFloat(selected.dataset.tip)
  } else if (isFinite(customTip.value)){
    tip = parseFloat(customTip.value)
  }
  return tip / 100
}

const getPeople = () => {
  const peopleCount = inputPeople.value
  const result = parseFloat(peopleCount)
  if (isNaN(result)) return 1
  return result
}

const resetSelection = () => {
  tips.forEach(tip => tip.classList.remove('selected'))
}

const compute = () => {

  const bill = getBill()
  const tip = getTip()
  const people = getPeople()

  const tipAmount = bill * tip / people
  const total = bill / people + tipAmount

  tipAmountLabel.textContent = `$${tipAmount.toFixed(2)}`
  totalLabel.textContent = `$${total.toFixed(2)}`
}

inputBill.addEventListener('keyup', () => { compute() })
inputPeople.addEventListener('keyup', () => { compute() })
customTip.addEventListener('keyup', () => {
  resetSelection()
  compute()
})

tips.forEach(tip => {
  tip.addEventListener('click', (e) => {
    resetSelection()
    customTip.value = ''
    tip.classList.add('selected')
    compute()
  })
})