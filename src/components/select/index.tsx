import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select as SelectMaterialUI,
    SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';

interface Option {
    label: string;
    value: any;
}

interface SelectProps {
    errorLabel: string;
    labelPosition: 'interior' | 'exterior';
    label: string;
    name: string;
    onChange: any;
    options: Option[];
    required: boolean;
    value: any;
    disabled?: boolean;
}

export default function Select({
    disabled = false,
    errorLabel,
    label,
    labelPosition = 'interior',
    name,
    onChange,
    options,
    required,
    value
}: SelectProps) {
    options;

    return labelPosition === 'interior' ? (
        <>
            <Box sx={{ width: '100%', backgroundColor: 'white' }}>
                <FormControl fullWidth>
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            width: 'fit-content%',
                            backgroundColor: 'white',
                            paddingRight: '5px'
                        }}
                    >
                        {label}
                    </InputLabel>
                    <SelectMaterialUI
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={value}
                        value={value}
                        label="Age"
                        name={name}
                        onChange={onChange}
                    >
                        {options.map((option: any, index: number) => (
                            <MenuItem key={index} value={option}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </SelectMaterialUI>
                </FormControl>
            </Box>
        </>
    ) : (
        <>
            <label className="text-sm">
                {label}{' '}
                {required && <span className="text-red-600 pt-2">*</span>}
            </label>
            <Box sx={{ width: '100%', paddingY: 1, backgroundColor: 'white' }}>
                <FormControl fullWidth>
                    <SelectMaterialUI
                        disabled={disabled}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label=""
                        name={name}
                        onChange={onChange}
                    >
                        {options?.map((option: any, index: number) => (
                            <MenuItem key={index} value={option}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </SelectMaterialUI>
                </FormControl>
            </Box>
            {errorLabel && (
                <p className="text-red-600 text-xs mb-2">{errorLabel}</p>
            )}
        </>
    );
}