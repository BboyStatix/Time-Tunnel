import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audioplayer'
import expandLogo from './img/expand.svg'

class AudioContainer extends Component {
  constructor(props){
    super(props)
    this.fetchEntries = this.fetchEntries.bind(this)
    this.expandContainer = this.expandContainer.bind(this)
    this.closeContainerModal = this.closeContainerModal.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = {
      entries: [],
      expandedEntries: [],
      containerExpanded: false
    }
  }

  componentWillReceiveProps(newProps) {
    this.fetchEntries(newProps.date)
  }

  fetchEntries(date) {
    fetch('/audio/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jwt: localStorage.jwt,
        date: date
      })
    }).then((res) => {
      return res.json()
    })
    .then((json) => {
      this.setState({entries: json.entries, expandedEntries: json.entries})
    })
  }

  expandContainer() {
    this.setState({ containerExpanded: true})
  }

  closeContainerModal(e){
    const modal = document.getElementById('containerModal')
    if(e.target === modal){
      this.setState({ containerExpanded: false , expandedEntries: this.state.entries})
    }
  }

  handleFormSubmit(e){
    e.preventDefault()
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase()
    var expandedEntries = this.state.entries.filter((entry) => {
      const entryName = entry.name.toLowerCase()
      const entryArtist = entry.artist
      return entryName.search(query) !== -1 || (entryArtist !== undefined && entryArtist.toLowerCase().search(query) !== -1)
    })
    this.setState({
      expandedEntries: expandedEntries
    })
  }

  render() {
    function ExpandedEntries(props){
      return <tbody>
        {
          props.entries.map((expandedEntry, index) =>
            <tr key={'expanded' + index}>
              <td className="text-truncate">{expandedEntry.name}</td><td className="text-truncate">{expandedEntry.artist}</td>
            </tr>
          )
        }
      </tbody>
    }

    return (
      <div>
        {
          this.state.containerExpanded ?
          <div className="custom-modal" id="containerModal" onClick={this.closeContainerModal}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <nav className='navbar'>
                  <form className="form-inline my-2 my-lg-0" onSubmit={this.handleFormSubmit}>
                    <input className="form-control mr-sm-2" placeholder="Search" onChange={this.handleSearch} />
                  </form>
                </nav>
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">artist</th>
                    </tr>
                  </thead>
                  <ExpandedEntries entries={this.state.expandedEntries} />
                </table>
              </div>
            </div>
          </div>
          :
          null
        }
        <div className="card">
          <div className="card-header bg-danger text-light">
            Audio
            <img className='expandLogo float-right' src={expandLogo} onClick={this.expandContainer}/>
          </div>
          <div className="card-body">
            <div className="container">
              {
                this.state.entries === undefined ?
                <div className="row"></div>
                :
                this.state.entries.map((entry,idx) =>
                  <div className="row" key={idx}>
                    <ReactAudioPlayer
                      playlist={[{name: entry.name, src: "/audio/view?jwt=" + localStorage.jwt + "&filename=" + entry.filename}]}
                      style={{width: '100%'}}
                    />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioContainer
