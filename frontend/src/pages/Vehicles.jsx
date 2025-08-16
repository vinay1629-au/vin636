import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Vehicles() {
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ plate:"", ownerName:"", make:"", model:"", color:"" });
  const [edit,setEdit] = useState(null);

  const load = async () => { const { data } = await api.get("/vehicles"); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/vehicles", form);
    setForm({ plate:"", ownerName:"", make:"", model:"", color:"" });
    load();
  };

  const save = async (id, row) => { await api.put(`/vehicles/${id}`, row); setEdit(null); load(); };
  const del  = async (id) => { await api.delete(`/vehicles/${id}`); load(); };

  return (
    <div style={{padding:16}}>
      <h2>Vehicles</h2>
      <form onSubmit={submit} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:16}}>
        <input placeholder="Plate" value={form.plate} onChange={e=>setForm({...form,plate:e.target.value})}/>
        <input placeholder="Owner Name" value={form.ownerName} onChange={e=>setForm({...form,ownerName:e.target.value})}/>
        <input placeholder="Make" value={form.make} onChange={e=>setForm({...form,make:e.target.value})}/>
        <input placeholder="Model" value={form.model} onChange={e=>setForm({...form,model:e.target.value})}/>
        <input placeholder="Color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})}/>
        <button style={{gridColumn:"span 5"}}>Add</button>
      </form>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#fafafa"}}><th>Plate</th><th>Owner</th><th>Make</th><th>Model</th><th>Color</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(it=>{
            const is = edit===it._id;
            const row = { ...it };
            return (
              <tr key={it._id} style={{borderTop:"1px solid #eee"}}>
                <td>{is ? <input defaultValue={it.plate} onChange={e=>row.plate=e.target.value}/> : it.plate}</td>
                <td>{is ? <input defaultValue={it.ownerName} onChange={e=>row.ownerName=e.target.value}/> : it.ownerName}</td>
                <td>{is ? <input defaultValue={it.make} onChange={e=>row.make=e.target.value}/> : it.make}</td>
                <td>{is ? <input defaultValue={it.model} onChange={e=>row.model=e.target.value}/> : it.model}</td>
                <td>{is ? <input defaultValue={it.color} onChange={e=>row.color=e.target.value}/> : it.color}</td>
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