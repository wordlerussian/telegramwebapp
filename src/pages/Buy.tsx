import { useState } from "react";

export default function Buy() {
  const [amount, setAmount] = useState<number | "">("");
  const [username, setUsername] = useState("");

  const isValid =
    username.trim().length > 0 &&
    typeof amount === "number" &&
    amount > 0;

  // синхронизация input ↔ slider
  const handleAmountChange = (value: number | "") => {
    if (value === "" || value < 0) return;
    setAmount(value);
  };

  const buyStars = () => {
    if (!isValid) return;

    console.log("BUY", {
      username,
      amount,
    });

    // тут потом sendData или fetch
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      <h2>Buy Stars ⭐</h2>

      {/* USERNAME */}
      <input
        type="text"
        placeholder="Telegram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />

      {/* AMOUNT INPUT */}
      <input
        type="number"
        placeholder="Stars amount"
        value={amount}
        onChange={(e) =>
          handleAmountChange(
            e.target.value === "" ? "" : Number(e.target.value)
          )
        }
        style={inputStyle}
      />

      {/* SLIDER */}
      <input
        type="range"
        min={1}
        max={20000}
        value={typeof amount === "number" ? amount : 1}
        onChange={(e) => handleAmountChange(Number(e.target.value))}
        style={{ width: "100%", marginTop: 10 }}
      />

      <p>Selected: <b>{amount || 0}</b> ⭐</p>

      {/* BUY BUTTON */}
      <button
        onClick={buyStars}
        disabled={!isValid}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "none",
          fontSize: 16,
          cursor: isValid ? "pointer" : "not-allowed",
          backgroundColor: isValid ? "#2ea6ff" : "#1f1f1f",
          color: isValid ? "#fff" : "#777",
        }}
      >
        Buy Stars
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: "1px solid #333",
  fontSize: 14,
};
