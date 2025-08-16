import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Offenses() {
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ licensePlate:"", violationType:"", location:"", fineAmount:0 });
  const [editId,setEditId] = useState(null);

  const load = async () => { const { data } = await api.get("/offenses"); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/offenses", form);
    setForm({ licensePlate:"", violationType:"", location:"", fineAmount:0 });
    load();
  };

  const save = async (id, row) => { await api.put(`/offenses/${id}`, row); setEditId(null); load(); };
  const del  = async (id) => { await api.delete(`/offenses/${id}`); load(); };

  return (
    <div style={{padding:16}}>
      <h2>Offenses</h2>
      <form onSubmit={submit} style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
        <input placeholder="License Plate" value={form.licensePlate} onChange={e=>setForm({...form,licensePlate:e.target.value})}/>
        <input placeholder="Violation Type" value={form.violationType} onChange={e=>setForm({...form,violationType:e.target.value})}/>
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <input type="number" placeholder="Fine Amount" value={form.fineAmount} onChange={e=>setForm({...form,fineAmount:Number(e.target.value)})}/>
        <button style={{gridColumn:"span 4"}}>Add</button>
      </form>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#fafafa"}}>
          <th>Plate</th><th>Type</th><th>Location</th><th>Fine</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {items.map(it=>{
            const isEdit = editId===it._id;
            const [row,setRow] = useState(it); // local row state per render
            return (
              <tr key={it._id} style={{borderTop:"1px solid #eee"}}>
                <td>{isEdit ? <input defaultValue={it.licensePlate} onChange={e=>row.licensePlate=e.target.value}/> : it.licensePlate}</td>
                <td>{isEdit ? <input defaultValue={it.violationType} onChange={e=>row.violationType=e.target.value}/> : it.violationType}</td>
                <td>{isEdit ? <input defaultValue={it.location} onChange={e=>row.location=e.target.value}/> : it.location}</td>
                <td>{isEdit ? <input type="number" defaultValue={it.fineAmount} onChange={e=>row.fineAmount=Number(e.target.value)}/> : it.fineAmount}</td>
                <td style={{whiteSpace:"nowrap"}}>
                  {!isEdit && <button onClick={()=>setEditId(it._id)}>Edit</button>}
                  {isEdit && <>
                    <button onClick={()=>save(it._id,row)}>Save</button>
                    <button onClick={()=>setEditId(null)}>Cancel</button>
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