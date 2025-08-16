import { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState("tutor@example.com");
  const [password,setPassword] = useState("Qut12345");
  const [err,setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      nav("/offenses");
    } catch (e) {
      setErr(e?.response?.data?.error || "Network error");
    }
  };

  return (
    <div style={{maxWidth:380,margin:"64px auto",padding:24,border:"1px solid #eee",borderRadius:12}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div style={{marginTop:12}}>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8}} />
        </div>
        <div style={{marginTop:12}}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:8}} />
        </div>
        {err && <p style={{color:"crimson"}}>{err}</p>}
        <button style={{marginTop:16,padding:"8px 14px"}}>Sign in</button>
      </form>
      <p style={{marginTop:12,fontSize:12,color:"#666"}}>Demo: tutor@example.com / Qut12345</p>
    </div>
  );
}