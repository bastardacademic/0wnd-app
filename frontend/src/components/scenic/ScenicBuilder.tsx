import React, { useEffect, useState, useContext } from 'react';
// remove static PROMPT_OPTIONS
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getScenicPlans,
  getScenicPlan,
  createScenicPlan,
  updateScenicPlan,
  deleteScenicPlan,
  getScenicOptions
} from '@/api/services/scenicService';

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
  const [promptOptions, setPromptOptions] = useState<Record<string, string[]>>({ roles: [], toys: [], equipment: [], vibes: [] });
  const [form, setForm] = useState({ title: '', partnerId: '', freeText: '', rolePrompts: [], toys: [], equipment: [], vibes: [] });

 useEffect(() => {
  getScenicOptions().then(setPromptOptions);
  fetchPlans();
  if (planId) loadPlan(planId);
}, [planId]);

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
   {(['roles','toys','equipment','vibes'] as const).map(cat => (
  <div key={cat} className="space-y-1">
    <label className="font-medium capitalize">{cat}</label>
    <Select
      isMulti
      options={promptOptions[cat].map(o => ({ value: o, label: o }))}
      value={(form.prompts![cat]||[]).map(v => ({ value: v, label: v }))}
      onChange={opts => setForm(f => ({
        ...f,
        prompts: { ...f.prompts!, [cat]: opts.map(o => o.value) }
      }))}
    />
  </div>
))}

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
