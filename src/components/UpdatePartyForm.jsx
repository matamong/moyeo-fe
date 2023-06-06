import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPartyById, useUpdateParty } from '../hooks/useParty';

const UpdatePartyForm = () => {
  const { partyId } = useParams();
  const { data: party, isLoading, isError } = useGetPartyById(partyId);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    img_path: '',
    is_private: false,
  });
  const updatePartyMutation = useUpdateParty();

  // Update the form data with the party details when it becomes available
  React.useEffect(() => {
    if (party) {
      setFormData({
        name: party.name,
        desc: party.desc || '',
        img_path: party.img_path || '',
        is_private: party.is_private || false,
      });
    }
  }, [party]);

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

    const updatedPartyData = {
      name: formData.name,
      desc: formData.desc,
      img_path: formData.img_path,
      is_private: formData.is_private,
    };

    try {
      console.log(updatedPartyData)
      await updatePartyMutation.mutateAsync(partyId, updatedPartyData);
      // Party updated successfully
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label>
        Image Path:
        <input
          type="text"
          name="img_path"
          value={formData.img_path}
          onChange={handleInputChange}
        />
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
      <button type="submit">Update Party</button>
    </form>
  );
};

export default UpdatePartyForm;
