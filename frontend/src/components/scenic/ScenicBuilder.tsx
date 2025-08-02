import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { getScenicPlans, createScenicPlan, updateScenicPlan, deleteScenicPlan } from '@/api/services/scenicService';
import { AuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const roleOptions = [
  { value: 'Top', label: 'Top' },
  { value: 'Bottom', label: 'Bottom' },
  { value: 'Switch', label: 'Switch' }
];
const toyOptions = [ /* populate as desired */ ];
const equipmentOptions = [ /* populate as desired */ ];
const vibeOptions = [ /* populate as desired */ ];

export const ScenicBuilder: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [plans, setPlans] = useState<any[]>([]);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [form, setForm] = useState({ title: '', partnerId: '', freeText: '', rolePrompts: [], toys: [], equipment: [], vibes: [] });

  useEffect(() => { loadPlans(); }, []);
  const loadPlans = async () => { setPlans(await getScenicPlans()); };

  const handleSave = async () => {
    try {
      if (editingPlan) {
        await updateScenicPlan(editingPlan.id, form);
        toast.success('Plan updated');
      } else {
        await createScenicPlan({ ...form, partnerId: form.partnerId });
        toast.success('Plan created');
      }
      setForm({ title: '', partnerId: '', freeText: '', rolePrompts: [], toys: [], equipment: [], vibes: [] });
      setEditingPlan(null);
      loadPlans();
    } catch {
      toast.error('Save failed');
    }
  };

  const handleEdit = (plan:any) => {
    setEditingPlan(plan);
    setForm({
      title: plan.title,
      partnerId: plan.partner._id,
      freeText: plan.freeText,
      rolePrompts: plan.rolePrompts.map(v=>({value:v,label:v})),
      toys: plan.toys.map(v=>({value:v,label:v})),
      equipment: plan.equipment.map(v=>({value:v,label:v})),
      vibes: plan.vibes.map(v=>({value:v,label:v}))
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Scenic Builder</h2>
      <div className="space-y-2 mb-4">
        <input type="text" placeholder="Title" value={form.title}
          onChange={e=>setForm(f=>({...f,title:e.target.value}))}
          className="w-full p-2 border rounded" />
        <input type="text" placeholder="Partner ID" value={form.partnerId}
          onChange={e=>setForm(f=>({...f,partnerId:e.target.value}))}
          className="w-full p-2 border rounded" />
        <textarea placeholder="Free description" value={form.freeText}
          onChange={e=>setForm(f=>({...f,freeText:e.target.value}))}
          className="w-full p-2 border rounded h-32"/>
        <Select isMulti options={roleOptions} value={form.rolePrompts}
          onChange={opts=>setForm(f=>({...f,rolePrompts:opts}))}
          placeholder="Select roles"/>
        <Select isMulti options={toyOptions} value={form.toys}
          onChange={opts=>setForm(f=>({...f,toys:opts}))}
          placeholder="Select toys"/>
        <Select isMulti options={equipmentOptions} value={form.equipment}
          onChange={opts=>setForm(f=>({...f,equipment:opts}))}
          placeholder="Select equipment"/>
        <Select isMulti options={vibeOptions} value={form.vibes}
          onChange={opts=>setForm(f=>({...f,vibes:opts}))}
          placeholder="Select vibes"/>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">
        {editingPlan ? 'Update Plan' : 'Create Plan'}
      </button>

      <h3 className="text-xl font-semibold mt-8 mb-4">Your Plans</h3>
      <ul className="space-y-4">
        {plans.map(p => (
          <li key={p._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm">With: {p.partner.username}</p>
              </div>
              <div className="space-x-2">
                <button onClick={()=>handleEdit(p)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={async()=>{await deleteScenicPlan(p._id); loadPlans();}} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
