import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface IInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Input: React.FC<IInputProps> = ({ name, label, options, ...rest }: IInputProps) => {
    
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select defaultValue='' id={name} {...rest}>
                <option value='' disabled hidden>Selecione uma opção</option>
                {options.map( (option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Input;