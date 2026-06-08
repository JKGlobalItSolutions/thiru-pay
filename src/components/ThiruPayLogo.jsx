import logo from '../assest/logo.jpeg';

export default function ThiruPayLogo({ height = 44 }) {
  return (
    <img
      src={logo}
      alt="ThiruPay Logo"
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
    />
  );
}
