function toCamelcase(object) {
  let obj = {}
  let entries = Object.entries(object)
  let isArray = []
  entries.forEach((element, index) => {
    if (typeof element[1] == "object") {
      const stringify = JSON.stringify(element[1])
      if (stringify.charAt(0) == "[") {
        isArray.push(index)
        for (let i = 0; i < element[1].length; i++) {
          if (typeof element[1][i] == "object") {
            let innerObj = toCamelcase(element[1][i])
            element[1][i] = innerObj
          }
        }
      }
      let innerObj = toCamelcase(element[1])
      element[1] = innerObj
    }
    for (let i = 0; i < element[0].length; i++) {
      if (element[0][i] == "_") {
        element[0] = element[0].replace(element[0].charAt(i), "")
        element[0] = element[0].replace(
          element[0].charAt(i),
          element[0].charAt(i).toUpperCase()
        )
      }
    }
  })
  if (isArray.length > 0) {
    let old_state = []
    for (let i = 0; i < isArray.length; i++) {
      console.log(entries[isArray[i]][1])
      const previousArr = Object.entries(entries[isArray[i]][1])
      previousArr.forEach((element) => {
        old_state.push(element[1])
      })
      entries[isArray[i]][1] = old_state
    }
  }
  obj = Object.fromEntries(entries)
  return obj
}
