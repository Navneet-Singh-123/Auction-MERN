import React, { Component } from "react";
class Countdown extends Component {
    state = {
      deadline: this.props.finalDate,
      days: "0",
      hours: "0",
      minutes: "0",
      seconds: "0",
      passed: false
    };
  
    getTime(deadline) {
      const time1 = new Date(this.state.deadline);
      const time2 = new Date();
      console.log("Deadline: ", time1);
      console.log("Current: ", time2); 
      const time = time1 - time2;
      console.log(time)
      if (time < 0) {
        this.setState({
          ...this.state, 
          passed:  true
        })
        // this.props.finished = true;
        console.log("Date passed");
      } else {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        this.setState({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }
  
    componentDidMount() {
      setInterval(() => this.getTime(this.state.deadline), 1000);
    }
  
    render() {
      return (
        <div>
            {
              this.state.passed && (
                <div>Auction is finished</div>
              )
            }
            {
              !this.state.passed  && (
                <div>                
                  <span className="text-primary">Days:</span> {this.state.days} <span className="text-primary">Hours:</span> {this.state.hours} <span className="text-primary">Minutes:</span> {this.state.minutes} <span className="text-primary">Seconds:</span> {this.state.seconds}
                </div>
              )
            }
        </div>
      );
    }
  }
  
  export default Countdown;