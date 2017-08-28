import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import {} from 'react-blessed-contrib';

class App extends Component {
  state = {
    progress: 0,
    progressColor: 'red',
    input: ''
  }

  componentDidMount() {
    const interval = setInterval(() => {
      let progress = this.state.progress;
      if (progress < 100) {
        this.setState({progress: progress + 1});
      } else {
        this.setState({progressColor: 'green'});
        clearInterval(interval);
      }
    }, 10);
  }

  render() {
    return (<box>
      <form
          ref="form"
          label="Google Shell"
          border={{type: 'line'}}
          bottom={9}
          onSubmit={this.handleSubmit.bind(this)}
          style={{border: {fg: 'yellow'}}}>
        <textbox
            ref="textbox"
            label="Input"
            border={{type: 'line'}}
            mouse={true}
            keys={['i']}
            height={3}
            onSubmit={this.handleSubmit.bind(this)}
            inputOnFocus={this.handleInputFocus.bind(this)}
            style={{border: {fg: 'blue'}}}>
        </textbox>
        <checkbox
            top={3}
            width={4}
            height={1}
            mouse={true}
            onCheck={this.handleCheck.bind(this)}
            onUncheck={this.handleUnheck.bind(this)}
            checked={false}>
        </checkbox>
        <button
            border={{type: 'line'}}
            mouse={true}
            height={3}
            width={8}
            top={4}
            onPress={this.handlePress.bind(this)}
            style={{border: {fg: 'green'}}}>
          Submit
        </button>
      </form>
      <form
          height={8}
          bottom={1}>
        <textbox
            ref="console"
            height={8}
            label="Console"
            border={{type: 'line'}}
            style={{border: {fg: 'red'}}}>
        </textbox>
      </form>
      <progressbar
          height={1}
          bottom={0}
          filled={this.state.progress}
          style={{bar: {bg: this.state.progressColor}}}>
      </progressbar>
    </box>);
  }

  handleInputFocus(e) {
    this.refs.textbox.readInput();
  }

  handleSubmit(input) {
    this.setState({input: input});
  }

  handleCheck() {
    this.refs.console.setContent('is checked');
  }

  handlePress() {
    /* this.refs.textbox.setContent('');*/
    /* this.refs.form.reset();*/
    this.refs.form.submit();
  }

  handleUnheck() {
    this.refs.console.setContent('not checked');
  }

  handleSubmit() {
    /* this.refs.console.setContent(this.state.input);*/
    /* this.refs.form.reset();*/
  }
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Google Shell'
});

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0);
});

const component = render(<App />, screen);
