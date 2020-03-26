import * as React from "react";
import "./styles.css";
// @ts-ignore
import Helmet from "react-helmet";

const generateCombinations = (input: string[], chain: string[]): string[] =>
  chain.length === input.length
    ? [chain.join(" ")]
    : input
        .filter(e => chain.indexOf(e) < 0)
        .flatMap(choice => generateCombinations(input, [...chain, choice]));

const possibilities = (s: string): string[] =>
  generateCombinations(
    s
      .split(" ")
      .map(e => e.trim())
      .filter(e => e !== ""),
    []
  );

export default () => {
  const [state, setState] = React.useState("jonna med de døde øjn");
  const result = React.useMemo(() => possibilities(state), [state]);
  return (
    <div className="App">
      <Helmet title={state} />
      <input value={state} onChange={e => setState(e.target.value)} />
      <hr />
      <p>Total count: {result.length}</p>
      <div>
        <ol>
          {result.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
