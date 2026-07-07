import React from "react"
import PropTypes from "prop-types"
import { copyToClipboard } from "./../utils/copy-to-clipboard"

export const Gif = ({ src, title, onCopy }) => (
  <img
    onClick={(event) => {
      copyToClipboard(event.target.src)
      onCopy()
    }}
    src={src}
    alt={title}
  />
)

Gif.propTypes = {
  onCopy: PropTypes.func.isRequired,
  src: PropTypes.string,
  title: PropTypes.string,
}
