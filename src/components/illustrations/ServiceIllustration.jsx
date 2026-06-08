export default function ServiceIllustration({ type, dark = false }) {
  const illustrations = {
    banking: <BankingIllustration dark={dark} />,
    insurance: <InsuranceIllustration dark={dark} />,
    travel: <TravelIllustration dark={dark} />,
    utility: <UtilityIllustration dark={dark} />,
  };
  return illustrations[type];
}

function BankingIllustration({ dark }) {
  const bg = dark ? '#0A1F44' : '#EEF4FF';
  const accent = '#FF6B00';
  const navy = '#163A7A';
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }} aria-hidden>
      <defs>
        <linearGradient id="bankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={navy} />
          <stop offset="100%" stopColor="#1E4D99" />
        </linearGradient>
      </defs>
      {/* Building */}
      <rect x="80" y="60" width="160" height="120" rx="4" fill="url(#bankGrad)" />
      {/* Roof / pediment */}
      <polygon points="60,60 160,20 260,60" fill="#0A1F44" />
      {/* Columns */}
      {[100, 130, 160, 190, 220].map(x => (
        <rect key={x} x={x} y="60" width="12" height="90" rx="2" fill="rgba(255,255,255,0.15)" />
      ))}
      {/* Door */}
      <rect x="146" y="130" width="28" height="50" rx="4" fill={accent} />
      {/* Windows */}
      {[100, 190].map(x => (
        <rect key={x} x={x} y="80" width="20" height="24" rx="3" fill="rgba(255,200,100,0.4)" />
      ))}
      {/* Rupee sign */}
      <text x="160" y="115" fill={accent} fontSize="22" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">₹</text>
      {/* Stars */}
      {[
        [40, 30], [280, 40], [50, 100], [290, 110],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={accent} opacity="0.5" />
      ))}
      {/* Ground */}
      <rect x="40" y="178" width="240" height="6" rx="3" fill={accent} opacity="0.25" />
    </svg>
  );
}

function InsuranceIllustration({ dark }) {
  const shieldColor = dark ? '#163A7A' : '#E3F2FD';
  const heartColor = '#EF4444';
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }} aria-hidden>
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#163A7A" />
          <stop offset="100%" stopColor="#0A1F44" />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path d="M160,20 L230,50 L230,110 Q230,165 160,185 Q90,165 90,110 L90,50 Z" fill="url(#shieldGrad)" />
      <path d="M160,28 L224,55 L224,110 Q224,160 160,178 Q96,160 96,110 L96,55 Z" fill="none" stroke="#FF6B00" strokeWidth="2.5" />
      {/* Heart */}
      <path d="M160,130 Q145,118 138,108 Q130,96 140,88 Q148,82 155,90 L160,96 L165,90 Q172,82 180,88 Q190,96 182,108 Q175,118 160,130 Z" fill={heartColor} />
      {/* Check on shield */}
      <polyline points="140,100 155,115 180,88" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Floating protection rings */}
      {[60, 45, 30].map((r, i) => (
        <circle key={i} cx="160" cy="100" r={r + 80} fill="none" stroke="#FF6B00" strokeWidth="0.8" opacity={0.15 - i * 0.04} />
      ))}
    </svg>
  );
}

function TravelIllustration({ dark }) {
  const skyColor = dark ? '#0A1F44' : '#E0F2FE';
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }} aria-hidden>
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={dark ? '#0A1F44' : '#BAE6FD'} />
          <stop offset="100%" stopColor={dark ? '#163A7A' : '#E0F2FE'} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="200" fill="url(#skyGrad)" rx="16" />
      {/* Clouds */}
      <ellipse cx="60" cy="40" rx="30" ry="14" fill="rgba(255,255,255,0.7)" />
      <ellipse cx="80" cy="35" rx="22" ry="12" fill="rgba(255,255,255,0.8)" />
      <ellipse cx="240" cy="55" rx="25" ry="12" fill="rgba(255,255,255,0.6)" />
      {/* Airplane body */}
      <path d="M60,110 L200,100 Q230,100 240,108 Q250,116 240,120 L200,115 L60,130 Z" fill="#FFFFFF" />
      {/* Wing */}
      <path d="M130,113 L160,80 L180,80 L165,113 Z" fill="#e0e0e0" />
      {/* Tail */}
      <path d="M60,115 L60,100 L80,108 Z" fill="#e0e0e0" />
      {/* Windows */}
      {[180, 200, 218].map(x => (
        <rect key={x} x={x} y="105" width="10" height="8" rx="3" fill={dark ? '#BBE3FF' : '#BAE6FD'} />
      ))}
      {/* Trail */}
      <path d="M240,110 Q270,107 300,100" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="5,4" />
      {/* Destination pin */}
      <circle cx="280" cy="160" r="16" fill="#FF6B00" />
      <path d="M280,145 Q293,145 293,155 Q293,162 280,175 Q267,162 267,155 Q267,145 280,145 Z" fill="#FF6B00" />
      <circle cx="280" cy="155" r="6" fill="#fff" />
    </svg>
  );
}

function UtilityIllustration({ dark }) {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }} aria-hidden>
      <defs>
        <linearGradient id="utilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF8C33" />
        </linearGradient>
      </defs>
      {/* Phone */}
      <rect x="110" y="20" width="100" height="170" rx="16" fill={dark ? '#163A7A' : '#0A1F44'} />
      <rect x="118" y="32" width="84" height="146" rx="10" fill={dark ? '#0A1F44' : '#1E4D99'} />
      {/* Home button */}
      <rect x="148" y="182" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
      {/* Screen content - service icons */}
      <rect x="124" y="38" width="72" height="18" rx="6" fill="url(#utilGrad)" />
      <text x="160" y="51" fill="#fff" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">ThiruPay</text>
      {/* Grid of service icons */}
      {[
        [130, 65, '📱'], [157, 65, '📺'], [184, 65, '⚡'],
        [130, 95, '💧'], [157, 95, '🔥'], [184, 95, '📶'],
      ].map(([x, y, emoji], i) => (
        <g key={i}>
          <rect x={Number(x) - 2} y={Number(y) - 2} width="22" height="22" rx="7" fill="rgba(255,255,255,0.08)" />
          <text x={Number(x) + 9} y={Number(y) + 13} fontSize="12" textAnchor="middle" fontFamily="sans-serif">{String(emoji)}</text>
        </g>
      ))}
      {/* Balance */}
      <rect x="122" y="125" width="76" height="36" rx="8" fill="url(#utilGrad)" />
      <text x="160" y="139" fill="rgba(255,255,255,0.8)" fontSize="7" textAnchor="middle" fontFamily="Inter,sans-serif">Balance</text>
      <text x="160" y="153" fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif">₹12,450</text>
      {/* Floating rupee coins */}
      {[[55, 60], [265, 80], [45, 140], [275, 150]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="14" fill={i % 2 === 0 ? '#FF6B00' : '#163A7A'} opacity="0.7" />
          <text x={cx} y={cy + 4} fill="#fff" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">₹</text>
        </g>
      ))}
    </svg>
  );
}