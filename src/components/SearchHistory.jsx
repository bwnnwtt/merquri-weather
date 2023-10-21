const SearchHistory = ({ history, handleHistorySearch, handleHistoryDelete }) => {
  return (
    <div className="search-history-container">
      <p>Search History</p>
      {
        history.map((obj, i) => (
          <div key={i} className="search-history-item-container">
            <div>
              {obj.name}&#44;&nbsp;{obj.sys?.country}
            </div>
            <div className="search-history-item-right">
              <div>
                {obj.datetime}
              </div>
              <button 
                className="history-button"
                onClick={() => {handleHistorySearch(obj)}}
              >
                <span className="icon-wrapper">
                  <span 
                    className="material-symbols-outlined"
                  >
                    search
                  </span>
                </span>
              </button>
              <button 
                className="history-button"
                onClick={() => handleHistoryDelete(obj.id)}
              >
                <span className="icon-wrapper">
                  <span 
                    className="material-symbols-outlined"
                  >
                    delete
                  </span>
                </span>
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default SearchHistory