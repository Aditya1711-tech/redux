import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export interface IFormInput {
  userName: string;
  email: string;
  channel: string;
}

const YoutubeForm: React.FC = () => {
  const form = useForm<IFormInput>();
  const { register, control, handleSubmit } = form;

  const { name, onChange, ref, onBlur } = register("userName", {
    required: "Username is required",
    maxLength: {
      value: 20,
      message: "Username should not exceed 20 characters",
    }, 
  });

  const onSubmit = (data: IFormInput) => {
    console.log("form submitted", data);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="userName">username</label>
              </td>
              <td>
                <input
                  type="text"
                  id="userName"
                  className="border-2"
                  name={name}
                  onChange={onChange}
                  ref={ref}
                  onBlur={onBlur}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">email</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  className="border-2"
                  {...register("email", {
                    required: "Email is required",
                    pattern:{
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email"
                    }
                  })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="channel">channel</label>
              </td>
              <td>
                <input
                  type="text"
                  id="channel"
                  className="border-2"
                  {...register("channel", {
                    required: "Channel is required",
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button className="bg-blue-300 p-2 cursor-pointer hover:bg-blue-400">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
