import { useState } from "react";
import "./App.css";
import img from  "./assets/github.png"

function App() {
  // State variables for each input
  const [costPrice, setCostPrice] = useState("");
  const [margin, setMargin] = useState("0");
  const [tax, setTax] = useState("0");
  const [numStep, setNumStep] = useState("0");
  const [discountRatio, setDiscountRatio] = useState("0");
  const [finalprice, setfinalprice] = useState("");
  const [shipping, setshipping] = useState("0");

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
    const shippingcost = parseFloat(shipping);

    const calmargin = (cost * marg) / 100;
    const caltax = (cost * taxx) / 100;
    const finalpriec = cost + calmargin + caltax + shippingcost;
    setfinalprice(finalpriec);

    if (steps > 0) {
      let newarr = [];
      for (let i = 0; i < steps; i++) {
        marg -= disratio;
        const calmargin = (cost * marg) / 100;
        const caltax = (cost * taxx) / 100;
        const finalpriec = cost + calmargin + caltax + shippingcost;
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
          <div className="row">
            <div className="col">
              <label htmlFor="Costprice">Cost Price</label>
              <input
                type="number"
                id="Costprice"
                className="text"
                value={costPrice}
                onChange={(e) => handleInputChange(e, setCostPrice)}
              />
            </div>
            <div className="col">
              <label htmlFor="Margin">Margin</label>
              <input
                type="number"
                id="Margin"
                value={margin}
                onChange={(e) => handleInputChange(e, setMargin)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="tax">VAT Tax</label>
              <input
                type="number"
                id="tax"
                value={tax}
                onChange={(e) => handleInputChange(e, setTax)}
              />
            </div>
            <div className="col">
              <label htmlFor="ship">Shipping</label>
              <input
                type="number"
                id="ship"
                value={shipping}
                onChange={(e) => handleInputChange(e, setshipping)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="numstep">Add number of price Tiers</label>
              <input
                type="number"
                id="numstep"
                placeholder="0"
                value={numStep}
                onChange={(e) => handleInputChange(e, setNumStep)}
              />
            </div>
            <div className="col">
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
            </div>
          </div>

          <button className="btn" onClick={calculatefinalprice}>Calculate</button>
        </div>

        <div className="showdata">
          <table>
            <tr>
              <th>Cost Price</th>
              <th>Margin %</th>
              <th>Tax VAT %</th>
              <th>Shipping</th>
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
              <td>{shipping}</td>
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
              <strong>Actual Price: </strong> {finalprice}
            </p>
          </div>
        </div>

        <div className="logo">
          <a href="https://github.com/umerweb" target="_blank">
          <img src={img} alt="" />
          <span>Developer</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
