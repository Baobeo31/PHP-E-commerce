import { useState } from "react";
import { useMutationHooks } from "../../hooks/useMutation";

interface ForgotPassFormState {
    email: string;
}
const ForgotPass: React.FC = () => {
    const [fommData, setFormData] = useState<ForgotPassFormState>({
        email: '',
    })
    const mutation = useMutationHooks();


}
