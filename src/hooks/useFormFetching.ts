import { useState, useRef, useEffect } from 'react'
import { useFetching } from './useFetching';

export const useFormFetching = (callback: () => void) => {
    const [validated, setValidated] = useState(false);

    const [formFetching, isLoading, error, clearError] = useFetching(async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === true) {
            setValidated(false);
            await callback();
        } else {
            setValidated(true);
        }
    })

    return [formFetching, isLoading, error, clearError, validated];
}
