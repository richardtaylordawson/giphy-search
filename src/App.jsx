import React, { Component } from "react"
import axios from "axios"
import { Results } from "./components/Results"

const GIPHY_API_KEY = import.meta.env.REACT_APP_GIPHY_API_KEY

export class App extends Component {
  state = {
    gifs: [],
    loading: true,
    textValue: "",
    numberOfGifs: 20,
    toastMessage: "",
  }

  toastTimeoutId = null

  hasGiphyApiKey = () => {
    if (GIPHY_API_KEY) {
      return true
    }

    this.setState({
      gifs: [],
      loading: false,
    })

    return false
  }

  getRandom = async () => {
    if (!this.hasGiphyApiKey()) {
      return
    }

    this.setState({
      gifs: [],
      loading: true,
    })

    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/random", {
        params: {
          api_key: GIPHY_API_KEY,
          rating: "g",
        },
      })

      const { data } = await response.data

      this.setState({
        gifs: [data],
        loading: false,
      })
    } catch (error) {
      console.error("Problem fetching and parsing data", error)
    }
  }

  getSearch = async (query = "react", limit = 5) => {
    if (!this.hasGiphyApiKey()) {
      return
    }

    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: GIPHY_API_KEY,
          rating: "",
          q: query,
          limit,
        },
      })

      const { data } = await response.data

      this.setState({
        gifs: data,
        loading: false,
      })
    } catch (error) {
      console.error("Problem fetching and parsing data", error)
    }
  }

  getTrending = async (limit = 15) => {
    if (!this.hasGiphyApiKey()) {
      return
    }

    try {
      const response = await axios.get(
        "https://api.giphy.com/v1/gifs/trending?",
        {
          params: {
            api_key: GIPHY_API_KEY,
            rating: "g",
            limit,
          },
        }
      )

      const { data } = await response.data

      this.setState({
        gifs: data,
        loading: false,
      })
    } catch (error) {
      console.error("Problem fetching and parsing data", error)
    }
  }

  handleChange(event) {
    if (event.currentTarget.id === "searchString") {
      this.setState({ textValue: event.target.value })
    } else {
      this.setState({ numberOfGifs: event.target.value })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.getSearch(this.state.textValue, this.state.numberOfGifs)
  }

  handleCopy = () => {
    window.clearTimeout(this.toastTimeoutId)
    this.setState({ toastMessage: "Copied!" })
    this.toastTimeoutId = window.setTimeout(() => {
      this.setState({ toastMessage: "" })
    }, 2000)
  }

  componentDidMount() {
    this.getTrending()
  }

  componentWillUnmount() {
    window.clearTimeout(this.toastTimeoutId)
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Giphy Search</h1>
        </div>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.textValue}
            onChange={this.handleChange.bind(this)}
            placeholder="Search..."
            id="searchString"
          />
          <select defaultValue={20} onChange={this.handleChange.bind(this)}>
            {[1, 2, 3, 4, 5, 10, 15, 20].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </form>

        <Results gifList={this.state.gifs} onCopy={this.handleCopy} />
        {this.state.toastMessage ? (
          <div className="toast" role="status" aria-live="polite">
            {this.state.toastMessage}
          </div>
        ) : null}
      </div>
    )
  }
}
