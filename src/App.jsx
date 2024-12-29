import { useState } from "react";
import "./App.css";

function App() {
  // State variables for each input
  const [costPrice, setCostPrice] = useState("");
  const [margin, setMargin] = useState("0");
  const [tax, setTax] = useState("0");
  const [numStep, setNumStep] = useState("0");
  const [discountRatio, setDiscountRatio] = useState("0");
  const [finalprice, setfinalprice] = useState("");

  const [steparr, setsteparr] = useState([]);

  // Function to handle changes in input values
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setsteparr([]);
  };

  const calculatefinalprice = () => {
    const cost = parseFloat(costPrice);
    let marg = parseFloat(margin);
    const taxx = parseFloat(tax);
    const steps = parseFloat(numStep);
    const disratio = parseFloat(discountRatio);

    const calmargin = (cost * marg) / 100;
    const caltax = (cost * taxx) / 100;
    const finalpriec = cost + calmargin + caltax;
    setfinalprice(finalpriec);

    if (steps > 0) {
      let newarr = [];
      for (let i = 0; i < steps; i++) {
        marg -= disratio;
        const calmargin = (cost * marg) / 100;
        const caltax = (cost * taxx) / 100;
        const finalpriec = cost + calmargin + caltax;
        newarr.push(finalpriec);
      }
      setsteparr(newarr);
    }
  };

  return (
    <>
      <div className="body">
        <h1>Price Calculator</h1>
        <div className="inputdata">
          <label htmlFor="Costprice">Cost Price</label>
          <input
            type="number"
            id="Costprice"
            className="text"
            value={costPrice}
            onChange={(e) => handleInputChange(e, setCostPrice)}
          />

          <label htmlFor="Margin">Margin</label>
          <input
            type="number"
            id="Margin"
            value={margin}
            onChange={(e) => handleInputChange(e, setMargin)}
          />

          <label htmlFor="tax">VAT Tax</label>
          <input
            type="number"
            id="tax"
            value={tax}
            onChange={(e) => handleInputChange(e, setTax)}
          />

          <label htmlFor="numstep">Add number of price Tiers</label>
          <input
            type="number"
            id="numstep"
            placeholder="0"
            value={numStep}
            onChange={(e) => handleInputChange(e, setNumStep)}
          />

          <label htmlFor="discountratio">
            Add discount% Ratio for price tiers
          </label>
          <input
            type="number"
            id="discountratio"
            value={discountRatio}
            placeholder="0"
            onChange={(e) => handleInputChange(e, setDiscountRatio)}
          />
          <button onClick={calculatefinalprice}>Calculate</button>
        </div>

        <div className="showdata">
          <table>
            <tr>
              <th>Cost Price</th>
              <th>Margin %</th>
              <th>Tax VAT %</th>
              {steparr.map((price, index) => (
                <th key={index}>
                  <p>Tier{index + 1}</p>
                </th>
              ))}
            </tr>
            <tr>
              <td>{costPrice}</td>
              <td>{margin}%</td>
              <td>{tax}%</td>
              {steparr.map((price, index) => (
                <td key={index}>
                  <p>{price}</p>
                </td>
              ))}
            </tr>
          </table>
          <div className="res">
            <p>
              <strong>Number of Price Tiers:</strong> {numStep}
            </p>
            <p>
              <strong>Discount Ratio:</strong> {discountRatio}%
            </p>
            <p>
              <strong>Final Price:</strong> {finalprice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
