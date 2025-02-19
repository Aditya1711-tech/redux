import { useState } from "react";

export interface InputFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  handleSave: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, handleSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <p onClick={handleClick}>{value || "Click to edit"}</p>
      )}
      {isEditing && (
        <>
          <button
            onClick={() => {
              handleSave();
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default InputField;
