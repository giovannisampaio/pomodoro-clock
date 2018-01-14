import React, { Component } from 'react';
import './App.css';
import tomato from './tomato.svg';

class App extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 25*60, duration: 25, label: "Start" };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  // take seconds as input and formats the data
  secondsToTime(secs){

    // copy to a helpers file
    function pad(val) {
      var valString = val + "";
      
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    };

    let hours = pad(Math.floor(secs / (60 * 60)));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = pad(Math.floor(divisor_for_minutes / 60));

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = pad(Math.ceil(divisor_for_seconds));

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  minutesToTime(min) {
    // copy to a helpers file
    function pad(val) {
      var valString = val + "";
      
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    };
    let secs = min * 60
    let hours = pad(Math.floor(secs / (60 * 60)));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = pad(Math.floor(divisor_for_minutes / 60));

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = pad(Math.ceil(divisor_for_seconds));

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  // is invoked immediately after a component is mounted
  // it takes the 'seconds' in state, converts it and pass it to 'time' also in state 
  componentDidMount() {
    // save the current time in a var
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    // set the time in state
    this.setState({ time: timeLeftVar });
  }

  // executes when the start button is clicked
  startTimer() {
    if (this.state.duration > 0) {
      if (this.state.label === "Start") {
      // runs the countDown method each second
      this.timer = setInterval(this.countDown, 1000);
      this.setState({label: "Pause"})
    }
      else {
      this.setState({label: "Start"})
      clearInterval(this.timer);
      }
    } 
  }

  resetTimer() {
    clearInterval(this.timer)

    let duration = this.state.duration
    let timeLeftVar = this.minutesToTime(duration);
    let seconds = this.state.duration * 60
    // reset the state
    this.setState({seconds: seconds, time: timeLeftVar, label: "Start"})
    this.timer = 0
  }

  changeDuration = e => {
    let minutes = Math.abs(e.target.value)
    this.setState({duration: minutes})
  }

  countDown() {

    // Remove one second 
    let seconds = this.state.seconds - 1;
    // set state so a re-render happens, which triggers componentDidMount()
    this.setState({
      // update time and seconds with 'seconds -1'
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero
    if (seconds === 0) { 
      clearInterval(this.timer);
      this.resetTimer();
    }
  }

  render() {
    return(
      <div className="App center">
        <img src={tomato} className="logo" alt="logo" />
        <h1> {this.state.time.m} : {this.state.time.s} </h1>
        <button className="waves-effect waves-teal btn-flat" onClick={this.startTimer}>{this.state.label}</button>
        <button className="waves-effect waves-teal btn-flat" onClick={this.resetTimer}>Reset</button>
        <form>
          <label>
            Pomodoro duration:
            <input type="number" min="1" className="duration" value={this.state.duration} onChange={this.changeDuration} />
          </label>
          {/*<input type="submit" value="Change" />/*/}
        </form>
      </div>
    );
  }
}

export default App;
