import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import helper from './numeralHelper'

class App extends Component {
  state={ value: '', numeralResult: '' }

  findNumeral = (num) => {
    // const { value } = this.state;
    if (num >= 1000) {
      return helper.handleThousands(num);
    } else if (num >= 500) {
      return helper.handleHundreds(num);
    } else if (num >= 100) {
      return helper.handleHundreds(num);
    } else if (num >= 50) {
      return helper.handleTens(num);
    } else if (num >= 10) {
      return helper.handleTens(num);
    } else if (num >= 1) {
      return helper.handleOnes(num);
    } else return `Must be Zero ${num}`;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Roman Numeral Converter</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const numeralResult = this.findNumeral(this.state.value);
                this.setState({ value: '', numeralResult });
              }}>
              <input type='text' value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })}/>
            </form>
        </div>
        <div
          id='numeral-result'
          style={{
            height: 60,
            border: '1px solid',
            margin: 'auto',
            marginTop: 40,
          }}>
          <h4 style={{ fontWeight: 600 }}>{this.state.numeralResult}</h4>
        </div>

        <div className="example-text" style={{ textAlign: 'left' }}>
          <h4 style={{ marginLeft: 40 }}>Here is some example text</h4>
          <ul style={{ listStyleType: 'none' }}>
            <li>2 -  should return "II".</li>
            <li>3 -  should return "III".</li>
            <li>3900 -  should return "MMMCM"</li>
            <li>500 - should return "D"</li>
            <li>501 -  should return "DI"</li>
            <li>649 -  should return "DCXLIX"</li>
            <li>4 -  should return "IV".</li>
            <li>5 -  should return "V".</li>
            <li>9 -  should return "IX".</li>
            <li>12 -  should return "XII".</li>
            <li>16 -  should return "XVI".</li>
            <li>29 -  should return "XXIX".</li>
            <li>44 -  should return "XLIV".</li>
            <li>45 -  should return "XLV"</li>
            <li>68 -  should return "LXVIII"</li>
            <li>83 -  should return "LXXXIII"</li>
            <li>97 -  should return "XCVII"</li>

            <li>500 -  should return "D"</li>
            <li>501 -  should return "DI"</li>
            <li>649 -  should return</li>

            <li>798 -  should return "DCCXCVIII"</li>

            <li>891 -  should return "DCCCXCI"</li>

            <li>1023 - should return "MXXIII"</li>

            <li>3999 - should return "MMMCMXCIX"</li>

          </ul>
        </div>

      </div>
    );
  }
}

export default App;
