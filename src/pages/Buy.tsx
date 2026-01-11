// src/pages/Buy.tsx
import { useEffect, useState } from "react";

const MIN = 50;
const MAX = 20000;

export default function Buy() {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;
  const theme = tg?.themeParams;

  useEffect(() => {
    tg?.ready?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // вызываем ready один раз

  const bgColor = theme?.bg_color || "#0a0a0a";
  const textColor = theme?.text_color || "#ffffff";
  const buttonColor = theme?.button_color || "#3b82f6";
  const linkColor = theme?.link_color || "#06b6d4";
  const hintColor = theme?.hint_color || "#6b7280";
  const secondaryBg = theme?.secondary_bg_color || "#111827";

  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<number>(MIN);

  // валидность формы
  const isValid =
    username.trim().length > 0 && amount >= MIN && amount <= MAX;

  // клик по кнопке Buy
  const handleBuy = () => {
    if (!isValid) return;
    tg?.sendData?.(
      JSON.stringify({
        action: "buy_stars",
        from_user: user?.id,
        target_username: username.trim(),
        amount,
        currency: "TON",
      })
    );
    // можно закрыть WebApp, если нужно:
    // tg?.close?.();
  };

  // вспомог: при вводе числа — ограничиваем и синхронизируем слайдер
  const handleNumberChange = (v: string) => {
    if (v === "") {
      setAmount(MIN);
      return;
    }
    const n = Number(v);
    if (Number.isNaN(n)) return;
    if (n < MIN) setAmount(MIN);
    else if (n > MAX) setAmount(MAX);
    else setAmount(Math.round(n));
  };

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}
      className="p-4 flex items-center justify-center"
    >
      {/* CSS для удаления стрелок у input[type=number] */}
      <style>{`
        /* Chrome, Edge, Safari */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="relative max-w-md w-full">
        <div
          className="absolute inset-0 rounded-2xl blur-xl animate-pulse"
          style={{ backgroundColor: `${buttonColor}20` }}
        />

        <div
          className="relative backdrop-blur-sm rounded-2xl p-6 shadow-2xl border"
          style={{
            backgroundColor: `${bgColor}cc`,
            borderColor: `${linkColor}50`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: linkColor, boxShadow: `0 0 10px ${linkColor}50` }}
              />
              <span className="text-sm font-mono tracking-wider" style={{ color: linkColor }}>
                BUY
              </span>
            </div>

            {user?.is_premium && (
              <div
                className="px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                style={{ backgroundColor: buttonColor, color: theme?.button_text_color || "#fff" }}
              >
                ⭐ PREMIUM
              </div>
            )}
          </div>

          {/* Username (вверху внутри Buy) */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg px-4 py-3 outline-none border"
              style={{
                backgroundColor: secondaryBg,
                borderColor: `${buttonColor}40`,
                color: textColor,
              }}
            />
          </div>

          {/* Number input (без стрелок) */}
          <div className="mb-3">
            <input
              type="number"
              min={MIN}
              max={MAX}
              value={amount}
              onChange={(e) => handleNumberChange(e.target.value)}
              className="w-full rounded-lg px-4 py-3 outline-none border"
              style={{
                backgroundColor: secondaryBg,
                borderColor: `${buttonColor}40`,
                color: textColor,
              }}
            />
          </div>

          {/* Slider */}
          <div className="mb-2">
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: hintColor }}>
              <span>{MIN}</span>
              <span>{MAX}</span>
            </div>
          </div>

          {/* Selected amount */}
          <div className="text-center my-4 text-lg font-semibold">
            {amount} ⭐
          </div>

          {/* Buy button */}
          <button
            onClick={handleBuy}
            disabled={!isValid}
            className="w-full py-3 rounded-xl font-bold transition"
            style={{
              backgroundColor: isValid ? buttonColor : `${buttonColor}40`,
              color: isValid ? theme?.button_text_color || "#fff" : hintColor,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Buy Stars
          </button>

          {/* footer */}
          <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: `${hintColor}30` }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: buttonColor }} />
              <span className="font-mono" style={{ color: hintColor }}>TELEGRAM WEB APP</span>
            </div>
            <span className="font-mono" style={{ color: hintColor }}>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
