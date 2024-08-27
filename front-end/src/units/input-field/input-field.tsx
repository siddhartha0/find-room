import { Icon } from "../icons/icons";
import * as icon from "react-feather";

interface inputFieldPropTypes
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  iconname?: icon.Icon;
  inputType: string;
  inputName?: string;
  inputValue: string | number;
}

export const InputField = ({
  iconname,
  inputType,
  inputValue,
  inputName,
  ...props
}: inputFieldPropTypes) => {
  return (
    <div className="flex rounded-lg p-4   bg-input-bg justify-between">
      <input
        type={inputType}
        className="bg-input-bg w-[85%] outline-none"
        name={inputName}
        value={inputValue}
        {...props}
      />
      <Icon name={iconname ?? icon.X} textColor="#ADADAD" />
    </div>
  );
};
