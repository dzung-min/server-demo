const form = document.querySelector("form")
const msg1 = document.getElementById("msg-1")
const msg2 = document.getElementById("msg-2")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  msg1.textContent = "Loading..."
  msg2.textContent = ""
  const location = form.address.value
  if (!location) {
    msg1.textContent = "Please provide a location."
  } else {
    ;(async () => {
      const res = await fetch(`/weather?address=${location}`)
      const data = await res.json()
      if (data.error) {
        msg1.textContent = data.error
      } else {
        msg1.textContent = data.location
        msg2.textContent = data.forecast
      }
    })()
    form.address.value = ""
  }
})
