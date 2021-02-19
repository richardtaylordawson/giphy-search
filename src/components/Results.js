import React from "react"
import PropTypes from "prop-types"
import { NoGifs } from "./NoGifs"
import { Gif } from "./Gif"

export const Results = ({ gifList }) => (
  <div className="results">
    {gifList.length ? (
      gifList.map((gif) => (
        <Gif key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
      ))
    ) : (
      <NoGifs />
    )}
  </div>
)

Gif.propTypes = {
  gifList: PropTypes.array,
}
