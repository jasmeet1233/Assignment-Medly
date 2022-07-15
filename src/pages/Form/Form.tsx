import React from 'react';
import { StyledForm } from './form.style';

const Formm: React.FC = () => {
    const onSubmit = (data: Record<string, any>) => {
        console.log(data);
        const updatedData = { ...data, first_name: data.firstName };
        localStorage.setItem('addedData', JSON.stringify(updatedData));
    };

    return (
        <StyledForm
            actionSchema={{
                actions: [
                    {
                        edges: 'rounded',
                        label: 'Submit',
                        type: 'submit'
                    }
                ],
                alignItems: 'right',
                flexDirection: 'row'
            }}
            disabled={false}
            fieldSchema={{
                email: {
                    label: 'Email',
                    required: true,
                    type: 'email'
                },
                firstName: {
                    gridColumn: '1/7',
                    label: 'first_name',
                    required: true,
                    type: 'text'
                },
                lastName: {
                    gridColumn: '7/-1',
                    label: 'Last Name',
                    required: true,
                    type: 'text'
                },

                place: {
                    gridColumn: '1/7',
                    label: 'Place',
                    required: true,
                    type: 'text'
                },

                designation: {
                    gridColumn: '1/7',
                    label: 'Designation',
                    required: true,
                    type: 'text'
                }
            }}
            fullWidth={false}
            header="Form Header"
            hideActions={false}
            initialState={{}}
            minWidth="50rem"
            onSubmit={(data: Record<string, any>) => onSubmit(data)}
        />
    );
};

export default Formm;
