import React from 'react';

// Generic Countdown Timer UI component
//
// https://github.com/uken/react-countdown-timer
//
// props:
//   - initialTimeRemaining: Number
//       The time remaining for the countdown (in ms).
//
//   - interval: Number (optional -- default: 1000ms)
//       The time between timer ticks (in ms).
//
//   - formatFunc(timeRemaining): Function (optional)
//       A function that formats the timeRemaining.
//
//   - tickCallback(timeRemaining): Function (optional)
//       A function to call each tick.
//
//   - completeCallback(): Function (optional)
//       A function to call when the countdown completes.
//

function CountdownTimerMaker(initialTimeRemaining, interval) {

  return React.createClass({
    displayName: 'CountdownTimer',

    propTypes: {
      formatFunc: React.PropTypes.func,
      tickCallback: React.PropTypes.func,
      completeCallback: React.PropTypes.func,
      pause: React.PropTypes.bool,
    },

    getDefaultProps: function() {
      return {
        formatFunc: null,
        tickCallback: null,
        completeCallback: null,
        pause: true
      };
    },

    getInitialState: function() {
      // Normally an anti-pattern to use this.props in getInitialState,
      // but these are all initializations (not an anti-pattern).
      return {
        timeRemaining: initialTimeRemaining,
        timeoutId: null,
        prevTime: null
      };
    },

    componentDidMount: function() {
      this.tick();
    },

    // componentWillReceiveProps: function(newProps) {
    //   if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    //   this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining});
    // },

    componentDidUpdate: function() {
      if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.isMounted()) {
        this.tick();
      }
    },

    componentWillUnmount: function() {
      clearTimeout(this.state.timeoutId);
    },

    tick: function() {
      const currentTime = Date.now();
      let dt = 0;
      if (!this.props.pause) {
        dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
      }


      // correct for small variations in actual timeout time
      const timeRemainingInInterval = (interval - (dt % interval));
      let timeout = timeRemainingInInterval;

      if (timeRemainingInInterval < (interval / 2.0)) {
        timeout += interval;
      }

      const timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
      const countdownComplete = (this.state.prevTime && timeRemaining <= 0);

      if (this.isMounted()) {
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
        this.setState({
          timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
          prevTime: currentTime,
          timeRemaining: timeRemaining
        });
      }

      if (countdownComplete) {
        if (this.props.completeCallback) { this.props.completeCallback(); }
        return;
      }

      if (this.props.tickCallback) {
        this.props.tickCallback(timeRemaining);
      }
    },

    getFormattedTime: function(milliseconds) {
      if (this.props.formatFunc) {
        return this.props.formatFunc(milliseconds);
      }

      const totalSeconds = Math.round(milliseconds / 1000);

      let seconds = parseInt(totalSeconds % 60, 10);
      let minutes = parseInt(totalSeconds / 60, 10) % 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return minutes + ':' + seconds;
    },

    render: function() {
      const timeRemaining = this.state.timeRemaining;

      return (
        <span>{this.getFormattedTime(timeRemaining)}</span>
      );
    }
  });
}

export default CountdownTimerMaker;
