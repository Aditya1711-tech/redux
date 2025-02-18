import { useState } from "react";

export interface InputFieldProps {
  value: string;
  handleSave: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, handleSave }) => {
  const [isEditiong, setIsEditing] = useState<boolean>(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const hanldeCancle = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditiong ? (
        <input type="text" value={value} onChange={e => console.log(e)}/>
      ) : (
        <p onClick={handleClick}>{value}</p>
      )}
      {isEditiong && <button onClick={handleSave}>Save</button>}
      {isEditiong && <button onClick={hanldeCancle}>Cancle</button>}
      <i className="fa fa-hacker-news" aria-hidden="true"></i>
    </div>
  );
};

export default InputField;
