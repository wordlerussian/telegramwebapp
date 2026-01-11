import { useState } from 'react'

function App() {
  window.Telegram?.WebApp?.ready()

  const tg = window.Telegram?.WebApp
  const user = tg?.initDataUnsafe?.user
  const theme = tg?.themeParams

  const bgColor = theme?.bg_color || '#0a0a0a'
  const textColor = theme?.text_color || '#ffffff'
  const buttonColor = theme?.button_color || '#3b82f6'
  const linkColor = theme?.link_color || '#06b6d4'
  const hintColor = theme?.hint_color || '#6b7280'

  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState(50)

  const sendToBot = () => {
    tg?.sendData(
      JSON.stringify({
        action: 'buy_stars',
        from_user: user?.id,
        target_username: username,
        amount,
        currency: 'TON'
      })
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="relative max-w-md w-full">
        {/* glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl animate-pulse"
          style={{ backgroundColor: `${buttonColor}20` }}
        />

        <div
          className="relative rounded-2xl p-6 shadow-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: `${bgColor}cc`,
            borderColor: `${linkColor}50`
          }}
        >
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <span
              className="text-sm font-mono tracking-wider"
              style={{ color: linkColor }}
            >
              BUY STARS
            </span>
            {user?.is_premium && (
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: buttonColor }}
              >
                ⭐ PREMIUM
              </span>
            )}
          </div>

          {/* USERNAME */}
          <input
            className="w-full mb-4 px-4 py-3 rounded-full outline-none bg-black/40"
            placeholder="@Enter Telegram username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* CURRENCY */}
          <div className="w-full mb-4 px-4 py-3 rounded-full bg-black/40 flex justify-between items-center">
            <span>TON</span>
            <span className="opacity-60">▼</span>
          </div>

          {/* AMOUNT */}
          <div className="mb-2 text-sm" style={{ color: hintColor }}>
            ⭐ Enter amount (50 – 1000)
          </div>

          <input
            type="range"
            min={50}
            max={1000}
            step={50}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full mb-2"
          />

          <div className="text-center mb-6 text-lg font-semibold">
            {amount} ⭐
          </div>

          {/* BUY BUTTON */}
          <button
            onClick={sendToBot}
            className="w-full py-3 rounded-full font-bold transition"
            style={{ backgroundColor: buttonColor }}
          >
            Buy Stars
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
