import React from "react"
import PropTypes from "prop-types"
import { useAlert } from "react-alert"
import { copyToClipboard } from "./../utils/copy-to-clipboard"

export const Gif = ({ src, title }) => {
  const alert = useAlert()

  return (
    <img
      onClick={(event) => {
        alert.show("Copied!")
        copyToClipboard(event.target.src)
      }}
      src={src}
      alt={title}
    />
  )
}

Gif.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
}
