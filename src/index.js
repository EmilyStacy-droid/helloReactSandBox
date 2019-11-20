import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const App = () => (
  <>
    <GrandParent />
  </>
);

class GrandParent extends React.Component {
  state = {
    things: ["Thing 1", "Thing 2"]
  };

  onNewThing(thing) {
    this.setState(prevState => {
      prevState.things.push(thing);
      return prevState;
    });
  }

  render() {
    return (
      <>
        <h1>Grandparent</h1>
        <SecondCousin things={this.state.things} />
        <Parent onNewThing={x => this.onNewThing(x)} />
      </>
    );
  }
}

const Parent = props => (
  <>
    <h2>Parent</h2>
    <p> I am a passive parent.</p>
    <Child {...props} />
  </>
);

class Child extends React.Component {
  state = {
    name: ""
  };

  onSubmit() {
    this.props.onNewThing(this.state.name);
    this.setState({ name: "" });
  }

  render() {
    return (
      <>
        <h3>Child</h3>

        <div>
          <label htmlFor="newThing">New thing</label> <br />
          <input
            id="newThing"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button type="button" onClick={e => this.onSubmit()}>
            Add Thing
          </button>
        </div>
      </>
    );
  }
}

const SecondCousin = props => (
  <>
    <h2>Second Cousin</h2>
    <ul>
      {props.things.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
