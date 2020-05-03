import React from 'react';
import './App.css';
import { CreateForm } from './CreateForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      visibility: false
    };

    this.listRecords = this.listRecords.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    this.listRecords();
  }
  listRecords() {
    fetch('/.netlify/functions/airtable/airtable.js')
      .then(response => response.json())
      .then(records => {
        this.setState({
          records
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  toggleVisibility(){
    this.setState({
      visibility: !this.state.visibility
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <h4 className="mt-20">React Airtable Netlify - Log</h4>
          
          <button onClick={this.toggleVisibility} className="btn btn-outline-primary btn-sm mb-2">{this.state.visibility ? 'Hide' : 'Show'} create form</button>
          {this.state.visibility ? 
            <CreateForm listRecords={this.listRecords}/> 
          : null}

          <ul className="list-group">
            {this.state.records.length > 0 ? ( this.state.records.map((record, index) =>
              <li key={'entry_' + index} className="list-group-item d-flex">
                <div className="p-1 flex-grow-1">{record.fields['Text']}</div>
                <div className="p-1 d-flex justify-content-between">
                  {record.fields['Tags'].map((tag, i) => <span key={'tag_' + i} className="badge badge-primary badge-pill">{tag}</span>)}  
                </div>
                <div className="p-1">{record.fields['Date']}</div>
              </li>) ) : (<p>Loading...</p>)
            }
          </ul>      
        </div>
      </div>
    )
  }
}

export default App;
