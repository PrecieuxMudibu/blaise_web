'use client';

import { FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputProps {
    disabled: boolean;
    errorLabel: string;
    label: string;
    labelPosition: 'interior' | 'exterior';
    name: string;
    onChange: any;
    required: boolean;
    type: string;
    placeholder?: string;
    value: string | number;
}
export default function Input({
    errorLabel,
    disabled = false,
    label,
    labelPosition = 'interior',
    name,
    required = false,
    type = '',
    placeholder,
    onChange,
    value
}: InputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return labelPosition === 'interior' ? (
        <div className="w-full bg-white">
            <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                disabled={disabled}
                label={label}
                name={name}
                onChange={onChange}
                variant="outlined"
                placeholder={placeholder}
                value={value}
            />

            {errorLabel && (
                <p className="text-red-600 text-xs mb-2">{errorLabel}</p>
            )}
        </div>
    ) : type !== 'password' ? (
        <div className="w-full">
            <label className="text-sm">
                {label}{' '}
                {required && <span className="text-red-600 pt-2">*</span>}
            </label>
            <TextField
                sx={{ width: '100%', marginY: 1 }}
                disabled={disabled}
                id="outlined-basic"
                label=""
                name={name}
                onChange={onChange}
                variant="outlined"
                value={value}
                type={type}
                placeholder={placeholder}
            />
            {errorLabel && (
                <p className="text-red-600 text-xs mb-2">{errorLabel}</p>
            )}
        </div>
    ) : (
        <div className="w-full">
            <label className="text-sm">
                {label}{' '}
                {required && <span className="text-red-600 pt-2">*</span>}
            </label>

            <FormControl sx={{ width: '100%', marginY: 1 }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-password"
                    disabled={disabled}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label=""
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
            </FormControl>

            {errorLabel && (
                <p className="text-red-600 text-xs mb-2">{errorLabel}</p>
            )}
        </div>
    );
}