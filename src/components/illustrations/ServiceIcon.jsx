export default function ServiceIcon({ id, size = 80 }) {
  const icons = {
    'digital-bank-account': <BankIcon size={size} />,
    'physical-card': <CardIcon size={size} />,
    'upi-payment': <UPIIcon size={size} />,
    loan: <LoanIcon size={size} />,
    investment: <InvestmentIcon size={size} />,
    'health-insurance': <HealthIcon size={size} />,
    'motor-insurance': <CarIcon size={size} />,
    'shop-insurance': <ShopIcon size={size} />,
    'device-insurance': <DeviceIcon size={size} />,
    'irctc-ticket-booking': <TrainIcon size={size} />,
    'flight-booking': <PlaneIcon size={size} />,
    'bus-booking': <BusIcon size={size} />,
    'hotel-booking': <HotelIcon size={size} />,
    'mobile-dth-recharge': <MobileIcon size={size} />,
    bbps: <BBPSIcon size={size} />,
    'ott-recharge': <OTTIcon size={size} />,
  };
  return icons[id] || <BankIcon size={size} />;
}

const Box = ({ children, primary, secondary, size = 80 }) => (
  <div style={{ width: size, height: size, borderRadius: 20, background: `linear-gradient(135deg, ${primary}, ${secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, flexShrink: 0 }}>
    {children}
  </div>
);

function BankIcon({ size }) { return <Box size={size} primary="#0A1F44" secondary="#163A7A"><i className="bi bi-bank" style={{ fontSize: size * 0.5 }} /></Box>; }
function CardIcon({ size }) { return <Box size={size} primary="#FF6B00" secondary="#FF8C33"><i className="bi bi-credit-card-2-front" style={{ fontSize: size * 0.5 }} /></Box>; }
function UPIIcon({ size }) { return <Box size={size} primary="#0066CC" secondary="#1976D2"><i className="bi bi-currency-exchange" style={{ fontSize: size * 0.5 }} /></Box>; }
function LoanIcon({ size }) { return <Box size={size} primary="#2E7D32" secondary="#43A047"><i className="bi bi-cash-coin" style={{ fontSize: size * 0.5 }} /></Box>; }
function InvestmentIcon({ size }) { return <Box size={size} primary="#7B1FA2" secondary="#9C27B0"><i className="bi bi-graph-up-arrow" style={{ fontSize: size * 0.5 }} /></Box>; }
function HealthIcon({ size }) { return <Box size={size} primary="#EF4444" secondary="#DC2626"><i className="bi bi-heart-pulse" style={{ fontSize: size * 0.5 }} /></Box>; }
function CarIcon({ size }) { return <Box size={size} primary="#1565C0" secondary="#1976D2"><i className="bi bi-car-front" style={{ fontSize: size * 0.5 }} /></Box>; }
function ShopIcon({ size }) { return <Box size={size} primary="#FF6B00" secondary="#FF8C33"><i className="bi bi-shop" style={{ fontSize: size * 0.5 }} /></Box>; }
function DeviceIcon({ size }) { return <Box size={size} primary="#22C55E" secondary="#16A34A"><i className="bi bi-laptop" style={{ fontSize: size * 0.5 }} /></Box>; }
function TrainIcon({ size }) { return <Box size={size} primary="#1565C0" secondary="#1976D2"><i className="bi bi-train-front" style={{ fontSize: size * 0.5 }} /></Box>; }
function PlaneIcon({ size }) { return <Box size={size} primary="#0A1F44" secondary="#163A7A"><i className="bi bi-airplane" style={{ fontSize: size * 0.5 }} /></Box>; }
function BusIcon({ size }) { return <Box size={size} primary="#FF6B00" secondary="#FF8C33"><i className="bi bi-bus-front" style={{ fontSize: size * 0.5 }} /></Box>; }
function HotelIcon({ size }) { return <Box size={size} primary="#2E7D32" secondary="#43A047"><i className="bi bi-building" style={{ fontSize: size * 0.5 }} /></Box>; }
function MobileIcon({ size }) { return <Box size={size} primary="#22C55E" secondary="#16A34A"><i className="bi bi-phone" style={{ fontSize: size * 0.5 }} /></Box>; }
function BBPSIcon({ size }) { return <Box size={size} primary="#A855F7" secondary="#7C3AED"><i className="bi bi-receipt" style={{ fontSize: size * 0.5 }} /></Box>; }
function OTTIcon({ size }) { return <Box size={size} primary="#EC4899" secondary="#BE185D"><i className="bi bi-play-btn" style={{ fontSize: size * 0.5 }} /></Box>; }