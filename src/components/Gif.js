import React from "react"
import PropTypes from "prop-types"

export const Gif = ({ src, title }) => <img src={src} alt={title} />

Gif.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
}
