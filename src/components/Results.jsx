import React from "react"
import PropTypes from "prop-types"
import { NoGifs } from "./NoGifs"
import { Gif } from "./Gif"

export const Results = ({ gifList, onCopy }) => (
  <div className="results">
    {gifList.length ? (
      gifList.map((gif) => (
        <Gif
          key={gif.id}
          src={gif.images.fixed_height.url}
          title={gif.title}
          onCopy={onCopy}
        />
      ))
    ) : (
      <NoGifs />
    )}
  </div>
)

Results.propTypes = {
  gifList: PropTypes.array,
  onCopy: PropTypes.func,
}
