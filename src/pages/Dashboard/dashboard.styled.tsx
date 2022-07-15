import { Button } from '@medly-components/core';
import { Form } from '@medly-components/forms';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
    /* ${Button.Style}{
        
    } */
    display: flex;
`;

export const FilterContainer = styled.div`
    display: flex;
    height: 80px;
    align-items: center;
    align-content: center;

    button {
        margin-bottom: 10px;
    }

    form {
        display: flex;
        align-items: center;
        align-content: center;
    }
`;
