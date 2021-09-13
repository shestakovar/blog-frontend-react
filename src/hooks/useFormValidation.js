import { useState } from 'react'

export const useFormValidation = (callback) => {
    const [validated, setValidated] = useState(false);

    const submit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === true) {
            setValidated(false);
            await callback();
        } else {
            setValidated(true);
        }
    }

    return [submit, validated];
}
