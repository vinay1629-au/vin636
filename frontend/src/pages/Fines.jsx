import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Fines() {
  const [items,setItems] = useState([]);
  const [offenses,setOffenses] = useState([]);
  const [form,setForm] = useState({ offenseId:"", amount:0, status:"unpaid", notes:"" });
  const [edit,setEdit] = useState(null);

  const load = async () => {
    const [f, o] = await Promise.all([api.get("/fines"), api.get("/offenses")]);
    setItems(f.data); setOffenses(o.data);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/fines", form);
    setForm({ offenseId:"", amount:0, status:"unpaid", notes:"" });
    load();
  };

  const save = async (id, row) => { await api.put(`/fines/${id}`, row); setEdit(null); load(); };
  const del  = async (id) => { await api.delete(`/fines/${id}`); load(); };

  return (
    <div style={{padding:16}}>
      <h2>Fines</h2>
      <form onSubmit={submit} style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
        <select value={form.offenseId} onChange={e=>setForm({...form,offenseId:e.target.value})}>
          <option value="">Select Offense</option>
          {offenses.map(o => <option key={o._id} value={o._id}>{o.licensePlate} — {o.violationType}</option>)}
        </select>
        <input type="number" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:Number(e.target.value)})}/>
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>unpaid</option><option>paid</option><option>cancelled</option>
        </select>
        <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        <button style={{gridColumn:"span 4"}}>Add</button>
      </form>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#fafafa"}}>
          <th>Offense</th><th>Amount</th><th>Status</th><th>Notes</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {items.map(it=>{
            const is = edit===it._id;
            const row = { ...it, offenseId: it.offenseId?._id || it.offenseId };
            return (
              <tr key={it._id} style={{borderTop:"1px solid #eee"}}>
                <td>{it?.offenseId?.licensePlate || row.offenseId}</td>
                <td>{is ? <input type="number" defaultValue={it.amount} onChange={e=>row.amount=Number(e.target.value)}/> : it.amount}</td>
                <td>{is ? (
                  <select defaultValue={it.status} onChange={e=>row.status=e.target.value}>
                    <option>unpaid</option><option>paid</option><option>cancelled</option>
                  </select>
                ) : it.status}</td>
                <td>{is ? <input defaultValue={it.notes||""} onChange={e=>row.notes=e.target.value}/> : (it.notes||"")}</td>
                <td>
                  {!is && <button onClick={()=>setEdit(it._id)}>Edit</button>}
                  {is && <>
                    <button onClick={()=>save(it._id,row)}>Save</button>
                    <button onClick={()=>setEdit(null)}>Cancel</button>
                  </>}
                  <button onClick={()=>del(it._id)} style={{marginLeft:8,color:"crimson"}}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}