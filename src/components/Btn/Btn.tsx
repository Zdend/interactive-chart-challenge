import React from 'react';
import styled from '@emotion/styled';
import { COLORS } from '../../shared/theme';

const ButtonStyled = styled.button`
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
    font-weight: 600;
    border-radius: 2px;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    &:hover, &:focus {
        background-color: ${COLORS.PRIMARY};
    }
    &:active {
        background-color: ${COLORS.GREY};
    }
`;

const Btn = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <ButtonStyled type="button" {...props} />
    );
};

export default Btn;