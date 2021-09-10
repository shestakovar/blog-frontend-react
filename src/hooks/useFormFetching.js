import { useState } from 'react'
import { useFetching } from './useFetching';

export const useFormFetching = (callback) => {
    const [validated, setValidated] = useState(false);

    const [formFetching, isLoading, error] = useFetching(async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === true) {
            await callback();
            setValidated(false);
        } else {
            setValidated(true);
        }
    })

    return [formFetching, isLoading, error, validated];
}
