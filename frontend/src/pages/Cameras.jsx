import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Cameras() {
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ code:"", location:"", status:"active" });
  const [edit,setEdit] = useState(null);

  const load = async () => { const { data } = await api.get("/cameras"); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/cameras", form);
    setForm({ code:"", location:"", status:"active" });
    load();
  };

  const save = async (id, row) => { await api.put(`/cameras/${id}`, row); setEdit(null); load(); };
  const del  = async (id) => { await api.delete(`/cameras/${id}`); load(); };

  return (
    <div style={{padding:16}}>
      <h2>Cameras</h2>
      <form onSubmit={submit} style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
        <input placeholder="Code" value={form.code} onChange={e=>setForm({...form,code:e.target.value})}/>
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>active</option><option>offline</option><option>maintenance</option>
        </select>
        <button style={{gridColumn:"span 3"}}>Add</button>
      </form>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#fafafa"}}><th>Code</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(it=>{
            const is = edit===it._id;
            const row = { ...it };
            return (
              <tr key={it._id} style={{borderTop:"1px solid #eee"}}>
                <td>{is ? <input defaultValue={it.code} onChange={e=>row.code=e.target.value}/> : it.code}</td>
                <td>{is ? <input defaultValue={it.location} onChange={e=>row.location=e.target.value}/> : it.location}</td>
                <td>{is ? (
                  <select defaultValue={it.status} onChange={e=>row.status=e.target.value}>
                    <option>active</option><option>offline</option><option>maintenance</option>
                  </select>
                ) : it.status}</td>
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