import React, { useState } from 'react';
import { useCreateParty } from '../hooks/useParty';
import { toast } from 'react-toastify';

const CreatePartyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    desc: '',
    img_path: '',
    is_private: false,
  });
  const createPartyMutation = useCreateParty();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const partyData = {
      name: formData.name,
      nickname: formData.nickname,
      desc: formData.desc,
      img_path: formData.img_path,
      is_private: formData.is_private,
    };


    try {
      await createPartyMutation.mutateAsync(partyData);
      toast.success('Party created successfully');
    } catch (error) {
      toast.error('There was an error!')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Nickname:
        <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="desc" value={formData.desc} onChange={handleInputChange}></textarea>
      </label>
      <label>
        Image Path:
        <input type="text" name="img_path" value={formData.img_path} onChange={handleInputChange} />
      </label>
      <label>
        Private:
        <input
          type="checkbox"
          name="is_private"
          checked={formData.is_private}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">파티 만들기</button>
    </form>
  );
}

export default CreatePartyForm;