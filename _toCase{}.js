function toCamelcase(object) {
  let obj = {}
  let entries = Object.entries(object)
  entries.forEach((element) => {
    if (typeof element[1] == "object") {
      const stringify = JSON.stringify(element[1])
      if (stringify.charAt(0) == "[") {
        return element[1]
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
  obj = Object.fromEntries(entries)
  return obj
}
