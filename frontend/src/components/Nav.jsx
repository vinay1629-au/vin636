import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const nav = useNavigate();
  const logout = () => { localStorage.removeItem("token"); nav("/login"); };
  return (
    <nav style={{display:"flex",gap:12,padding:12,borderBottom:"1px solid #ddd"}}>
      <Link to="/">Home</Link>
      <Link to="/offenses">Offenses</Link>
      <Link to="/cameras">Cameras</Link>
      <Link to="/vehicles">Vehicles</Link>
      <Link to="/fines">Fines</Link>
      <span style={{marginLeft:"auto"}} />
      <button onClick={logout}>Logout</button>
    </nav>
  );
}