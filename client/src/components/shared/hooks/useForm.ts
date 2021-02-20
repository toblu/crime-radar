import React from 'react';
import useDebouncedEffect from './useDebouncedEffect';

type Values = {
    [key: string]: string;
};

type ValidationErrors = {
    [key: string]: string;
};

type SubmitFn = () => void | Promise<void>;
type ValidateFn = (values: Values) => ValidationErrors;

export const useForm = (submitFn: SubmitFn, validate?: ValidateFn) => {
    const [errors, setErrors] = React.useState<ValidationErrors>({});
    const [values, setValues] = React.useState<Values>({});
    const [errorFields, setErrorFields] = React.useState<{
        [key: string]: boolean;
    }>({});
    const [errorMessages, setErrorMessages] = React.useState<{
        [key: string]: string;
    }>({});

    const isValid = !(errors && Object.keys(errors).length);

    React.useLayoutEffect(() => {
        if (validate) {
            const errors = validate(values);
            setErrors(errors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    useDebouncedEffect(
        () => {
            setErrorFields(
                Object.fromEntries(
                    Object.keys(errors)
                        .filter((field) => !!values[field])
                        .map((field) => [field, true])
                )
            );
        },
        [errors],
        400
    );

    useDebouncedEffect(
        () => {
            setErrorMessages(errors);
        },
        [errors],
        800
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        if (isValid) {
            submitFn();
        }
    };

    return {
        isValid,
        handleChange,
        handleSubmit,
        values,
        errorFields,
        errorMessages
    };
};
