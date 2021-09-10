import { useState, useRef, useEffect } from 'react'
import { useFetching } from './useFetching';

export const useFormFetching = (callback) => {
    const [validated, setValidated] = useState(false);
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false }
    }, []);

    const [formFetching, isLoading, error] = useFetching(async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === true) {
            await callback();
            if (isMounted.current) setValidated(false);
        } else {
            setValidated(true);
        }
    })

    return [formFetching, isLoading, error, validated];
}
