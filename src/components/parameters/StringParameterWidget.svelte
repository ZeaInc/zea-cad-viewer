<script>
  export let parameter
  let paramValue = parameter.getValue()

  let changing = false
  const displayValue = () => {
    if (changing) return
    paramValue = parameter.getValue()
  }

  const handleEditChange = (event) => {
    paramValue = event.target.value
    changing = true
    parameter.setValue(paramValue)
    changing = false
  }

  parameter.on('valueChanged', (event) => {
    displayValue()
  })
</script>

<input
  on:input={handleEditChange}
  value={paramValue}
  readonly
  class="StringParameterWidget text-black rounded p-1 w-full"
/>
