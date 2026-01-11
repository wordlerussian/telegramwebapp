import { useState } from "react";

function Buy() {
  window.Telegram?.WebApp?.ready();

  const theme = window.Telegram?.WebApp?.themeParams;

  const bgColor = theme?.bg_color || "#0a0a0a";
  const textColor = theme?.text_color || "#ffffff";
  const buttonColor = theme?.button_color || "#3b82f6";
  const linkColor = theme?.link_color || "#06b6d4";
  const hintColor = theme?.hint_color || "#6b7280";

  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");

  const num = Number(value);

  const isUsernameValid = username.trim().length > 0;
  const isValueEmpty = value.trim() === "";
  const isValueValid =
    !isValueEmpty && !isNaN(num) && num >= 50 && num <= 20000;

  const canBuy = isUsernameValid && isValueValid;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="relative max-w-md w-full">
        {/* glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{ backgroundColor: `${buttonColor}20` }}
        />

        <div
          className="relative rounded-2xl p-6 shadow-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: `${bgColor}cc`,
            borderColor: `${linkColor}50`,
          }}
        >
          {/* TITLE */}
          <div
            className="text-center text-sm font-mono tracking-widest mb-6"
            style={{ color: linkColor }}
          >
            BUY STARS
          </div>

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Введите username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg p-3 outline-none border text-sm mb-3"
            style={{
              backgroundColor: `${bgColor}80`,
              borderColor: `${hintColor}40`,
              color: textColor,
            }}
          />

          {/* VALUE */}
          <input
            type="text"
            inputMode="numeric"
            placeholder="Введите значение (от 50 до 20000)"
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d*$/.test(v)) setValue(v);
            }}
            className="w-full rounded-lg p-3 outline-none border text-sm"
            style={{
              backgroundColor: `${bgColor}80`,
              borderColor: `${hintColor}40`,
              color: textColor,
            }}
          />

          {/* ERROR */}
          {!isValueEmpty && !isValueValid && (
            <div
              className="mt-2 text-xs font-mono"
              style={{ color: "#ef4444" }}
            >
              Число должно быть от 50 до 20000
            </div>
          )}

          {/* BUTTON */}
          <button
            disabled={!canBuy}
            className="w-full mt-4 py-3 rounded-xl font-bold transition"
            style={{
              backgroundColor: canBuy
                ? buttonColor
                : `${buttonColor}40`,
              color: "#fff",
              cursor: canBuy ? "pointer" : "not-allowed",
            }}
            onClick={() => {
              if (!canBuy) return;
              console.log("BUY:", {
                username,
                amount: num,
              });
            }}
          >
            BUY STARS
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
