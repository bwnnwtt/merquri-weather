import { useState } from "react"

const Search = ({handleSearch, handleSearchChange, search}) => {

  const [isFocus, setIsFocus] = useState(false)

  const handleFocus = () => {
    setIsFocus(!isFocus)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search-container">
      <label 
        className={`${isFocus ? 'search-label focus' : 'search-label'}`}
        htmlFor="search"
      >
        Country
      </label>
      <input 
        className={`${isFocus ? 'search-input focus' : 'search-input'}`}
        type="text"
        id="search" 
        placeholder="Enter country or city..."
        value={search}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleFocus}
        onKeyDown={handleKeyPress}
      />
      <button 
        className="search-button"
        onClick={handleSearch}
      >
        <span 
          className="material-symbols-outlined"
        >
          search
        </span>
      </button>
    </div>
  )
}

export default Search