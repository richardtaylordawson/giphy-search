/**
 * Copies a value to the user's clipboard
 * @param {string} value - The value to copy to the clipboard
 */
export const copyToClipboard = (value) => {
  const tempElement = document.createElement("textarea")

  tempElement.value = value
  tempElement.setAttribute("readonly", "")
  tempElement.style.position = "absolute"
  tempElement.style.left = "-9999px"
  document.body.appendChild(tempElement)
  tempElement.select()
  document.execCommand("copy")
  document.body.removeChild(tempElement)
}
