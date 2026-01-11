import { useState } from "react";

export default function Buy() {
  window.Telegram?.WebApp?.ready();

  const theme = window.Telegram?.WebApp?.themeParams;

  const bgColor = theme?.bg_color || "#0a0a0a";
  const textColor = theme?.text_color || "#ffffff";
  const buttonColor = theme?.button_color || "#3b82f6";
  const hintColor = theme?.hint_color || "#6b7280";
  const secondaryBg = theme?.secondary_bg_color || "#111827";

  const MIN = 50;
  const MAX = 20000;

  const [amount, setAmount] = useState<number | "">("");

  const valid =
    typeof amount === "number" && amount >= MIN && amount <= MAX;

  const onBuy = () => {
    if (!valid) return;

    // сюда потом прикрутишь бота
    window.Telegram?.WebApp?.sendData(
      JSON.stringify({
        action: "buy_stars",
        amount,
      })
    );
  };

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}
      className="p-4 flex items-center justify-center"
    >
      <div className="relative max-w-md w-full">
        <div
          className="relative rounded-2xl p-6 shadow-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: `${bgColor}cc`,
            borderColor: `${buttonColor}40`,
          }}
        >
          {/* TITLE */}
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold">⭐ Buy Stars</h1>
            <p className="text-sm mt-1" style={{ color: hintColor }}>
              Choose amount from {MIN} to {MAX}
            </p>
          </div>

          {/* INPUT */}
          <div className="mb-4">
            <input
              type="number"
              min={MIN}
              max={MAX}
              value={amount}
              onChange={(e) => {
                const v = Number(e.target.value);
                setAmount(isNaN(v) ? "" : v);
              }}
              placeholder="Enter amount"
              className="w-full rounded-lg px-4 py-3 outline-none border"
              style={{
                backgroundColor: secondaryBg,
                borderColor: `${buttonColor}40`,
                color: textColor,
              }}
            />
          </div>

          {/* SLIDER */}
          <div className="mb-6">
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={typeof amount === "number" ? amount : MIN}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full"
            />
            <div
              className="flex justify-between text-xs mt-1"
              style={{ color: hintColor }}
            >
              <span>{MIN}</span>
              <span>{MAX}</span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={!valid}
            onClick={onBuy}
            className="w-full py-3 rounded-xl font-bold transition"
            style={{
              backgroundColor: valid ? buttonColor : `${buttonColor}40`,
              color: valid ? theme?.button_text_color || "#fff" : hintColor,
              cursor: valid ? "pointer" : "not-allowed",
            }}
          >
            Buy Stars
          </button>
        </div>
      </div>
    </div>
  );
}
