export default function HeroIllustration({ dark = true }) {
  const glassStroke = dark ? 'rgba(255,255,255,0.15)' : 'rgba(10,31,68,0.12)';
  const glassFill = dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.9)';
  const textColor = dark ? '#FFFFFF' : '#0A1F44';
  const subText = dark ? 'rgba(255,255,255,0.55)' : '#888';
  const cardBg = dark ? 'rgba(255,255,255,0.08)' : '#FFFFFF';
  const cardShadow = dark ? 'rgba(0,0,0,0.4)' : 'rgba(10,31,68,0.15)';

  return (
    <svg
      viewBox="0 0 420 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="phoneBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dark ? '#0A1F44' : '#163A7A'} />
          <stop offset="100%" stopColor={dark ? '#163A7A' : '#1E4D99'} />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF8C33" />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor={cardShadow} floodOpacity="1" />
        </filter>
        <filter id="glowOrange">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="phoneClip">
          <rect x="110" y="30" width="200" height="420" rx="32" />
        </clipPath>
      </defs>

      {/* Glow behind phone */}
      <ellipse cx="210" cy="240" rx="90" ry="80" fill="#FF6B00" opacity="0.15" filter="url(#glowOrange)" />

      {/* Phone shadow */}
      <rect x="115" y="38" width="200" height="416" rx="32" fill="rgba(0,0,0,0.25)" filter="url(#softShadow)" />

      {/* Phone frame */}
      <rect x="110" y="30" width="200" height="420" rx="32" fill="url(#phoneBg)" stroke={glassStroke} strokeWidth="2" />

      {/* Screen bezel top */}
      <rect x="125" y="42" width="170" height="396" rx="22" fill={dark ? '#0D2248' : '#0A1F44'} opacity="0.6" />

      {/* Dynamic island */}
      <rect x="175" y="50" width="70" height="16" rx="8" fill="#000" />

      {/* Status bar */}
      <text x="133" y="66" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Inter,sans-serif">9:41</text>
      <rect x="278" y="59" width="14" height="7" rx="1.5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      <rect x="279" y="60" width="10" height="5" rx="1" fill="rgba(255,255,255,0.6)" />

      {/* App header */}
      <text x="133" y="88" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter,sans-serif">Good morning</text>
      <text x="133" y="102" fill="#FFFFFF" fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif">Rajan Kumar</text>
      <circle cx="292" cy="94" r="14" fill="url(#orangeGrad)" />
      <text x="292" y="98" fill="#fff" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">RK</text>

      {/* Balance card */}
      <rect x="125" y="114" width="170" height="78" rx="16" fill="url(#orangeGrad)" />
      <text x="138" y="135" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="Inter,sans-serif">Wallet Balance</text>
      <text x="138" y="158" fill="#FFFFFF" fontSize="20" fontWeight="800" fontFamily="Inter,sans-serif">₹1,24,850</text>
      <text x="138" y="175" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="Inter,sans-serif">Today: </text>
      <text x="163" y="175" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="Inter,sans-serif">+₹3,240</text>
      <rect x="230" y="155" width="55" height="22" rx="8" fill="rgba(255,255,255,0.2)" />
      <text x="257.5" y="170" fill="#fff" fontSize="8" fontWeight="600" fontFamily="Inter,sans-serif" textAnchor="middle">Add Money</text>

      {/* Quick actions */}
      {[
        { x: 133, label: 'AEPS', emoji: '🏧', color: '#3B82F6' },
        { x: 168, label: 'Send', emoji: '💸', color: '#22C55E' },
        { x: 203, label: 'Bill', emoji: '📄', color: '#A855F7' },
        { x: 238, label: 'More', emoji: '⋯', color: '#FF6B00' },
      ].map(({ x, label, emoji, color }) => (
        <g key={label}>
          <rect x={x} y="204" width="28" height="30" rx="10" fill={`${color}25`} />
          <text x={x + 14} y="222" fontSize="11" textAnchor="middle" fontFamily="sans-serif">{emoji}</text>
          <text x={x + 14} y="242" fill="rgba(255,255,255,0.65)" fontSize="7.5" textAnchor="middle" fontFamily="Inter,sans-serif">{label}</text>
        </g>
      ))}

      {/* Transactions header */}
      <text x="133" y="265" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Recent</text>
      <text x="270" y="265" fill="#FF8C33" fontSize="8" fontFamily="Inter,sans-serif">See all</text>

      {/* Transaction rows */}
      {[
        { y: 275, name: 'AEPS Withdrawal', amt: '+₹850', time: '2m ago' },
        { y: 300, name: 'Mobile Recharge', amt: '+₹15', time: '8m ago' },
        { y: 325, name: 'Electricity Bill', amt: '+₹42', time: '20m ago' },
      ].map(({ y, name, amt, time }) => (
        <g key={name}>
          <rect x="125" y={y} width="170" height="22" rx="8" fill="rgba(255,255,255,0.05)" />
          <text x="135" y={y + 14} fill="rgba(255,255,255,0.8)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">{name}</text>
          <text x="275" y={y + 14} fill="#22C55E" fontSize="8.5" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="end">{amt}</text>
        </g>
      ))}

      {/* Bottom nav */}
      <rect x="125" y="380" width="170" height="36" rx="12" fill="rgba(255,255,255,0.06)" />
      {['Home', 'History', 'Earn', 'Profile'].map((label, i) => (
        <g key={label}>
          <rect x={133 + i * 40} y="386" width="20" height="8" rx="4" fill={i === 0 ? '#FF6B00' : 'rgba(255,255,255,0.2)'} />
          <text x={143 + i * 40} y="407" fill={i === 0 ? '#FF8C33' : 'rgba(255,255,255,0.35)'} fontSize="6.5" textAnchor="middle" fontFamily="Inter,sans-serif">{label}</text>
        </g>
      ))}

      {/* Home button */}
      <rect x="186" y="425" width="48" height="6" rx="3" fill="rgba(255,255,255,0.25)" />

      {/* Floating card: Monthly Earnings */}
      <g transform="translate(0, 100)" filter="url(#softShadow)">
        <rect x="2" y="80" width="110" height="58" rx="16" fill={cardBg} stroke={glassStroke} strokeWidth="1" />
        <text x="14" y="100" fill={subText} fontSize="8" fontFamily="Inter,sans-serif">Monthly Income</text>
        <text x="14" y="117" fill="#FF6B00" fontSize="16" fontWeight="800" fontFamily="Inter,sans-serif">₹85,000</text>
        <rect x="14" y="124" width="82" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
        <rect x="14" y="124" width="66" height="5" rx="2.5" fill="url(#orangeGrad)" />
      </g>

      {/* Floating card: Settlement */}
      <g transform="translate(0, -20)" filter="url(#softShadow)">
        <rect x="308" y="160" width="108" height="56" rx="16" fill={cardBg} stroke={glassStroke} strokeWidth="1" />
        <text x="320" y="179" fill={subText} fontSize="8" fontFamily="Inter,sans-serif">Settlement</text>
        <circle cx="320" cy="193" r="4" fill="#22C55E" />
        <text x="328" y="197" fill="#22C55E" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif">Instant</text>
        <text x="320" y="209" fill={subText} fontSize="7.5" fontFamily="Inter,sans-serif">T+0 Guarantee</text>
      </g>

      {/* Floating card: Agents */}
      <g filter="url(#softShadow)">
        <rect x="310" y="290" width="108" height="60" rx="16" fill={cardBg} stroke={glassStroke} strokeWidth="1" />
        <text x="322" y="311" fill={subText} fontSize="8" fontFamily="Inter,sans-serif">Active Agents</text>
        <text x="322" y="330" fill={textColor} fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">500K+</text>
        <text x="322" y="344" fill="#22C55E" fontSize="7.5" fontFamily="Inter,sans-serif">↑ 12.4% this month</text>
      </g>

      {/* Abstract circles decoration */}
      <circle cx="60" cy="450" r="40" fill="none" stroke="#FF6B00" strokeWidth="1.5" opacity="0.2" />
      <circle cx="60" cy="450" r="25" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.15" />
      <circle cx="370" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <circle cx="370" cy="60" r="16" fill="rgba(255,107,0,0.1)" />
    </svg>
  );
}