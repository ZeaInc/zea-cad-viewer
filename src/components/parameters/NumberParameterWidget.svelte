<script>
  export let parameter

  let step = parameter.getStep()
  let paramValue = parameter.getValue()

  let sliderChanging = false
  const displayValue = () => {
    if (sliderChanging) return
    paramValue = parameter.getValue()
  }

  const handleEditChange = (event) => {
    paramValue = event.target.valueAsNumber
    sliderChanging = true
    parameter.setValue(paramValue)
    sliderChanging = false
  }

  parameter.on('valueChanged', (event) => {
    displayValue()
  })
</script>

<input
  on:input={handleEditChange}
  {step}
  type="number"
  readonly
  value={paramValue}
  class="NumberParameterWidget text-black rounded p-1 w-full"
/>
