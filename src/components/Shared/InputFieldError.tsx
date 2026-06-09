
import { getInputFieldError, IInputErrorState } from "@/lib/generateInputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldError {
    field: string,
    state: IInputErrorState 
}

const InputFieldError = ({ field, state }: InputFieldError) => {
    if (getInputFieldError(field, state)) {
        return (
            <FieldDescription className="text-destructive">
                {getInputFieldError(field, state)}
            </FieldDescription>
        );
    }
    return null
};

export default InputFieldError;