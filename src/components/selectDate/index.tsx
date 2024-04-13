import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface DatePickerProps {
    defaultValue: string;
    errorLabel: string;
    label: string;
    labelPosition: string;
    onChange: any;
    required: boolean;
    value: any;
}

export default function SelectDate({
    errorLabel,
    defaultValue,
    label,
    labelPosition = 'internal',
    onChange,
    required = false,
    value
}: DatePickerProps) {
    return labelPosition === 'internal' ? (
        <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    defaultValue={dayjs(defaultValue)}
                    format="DD/MM/YYYY"
                    onChange={onChange}
                    sx={{ width: '100%', marginY: 1 }}
                    value={dayjs(value)}
                />
            </LocalizationProvider>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    defaultValue={dayjs(defaultValue)}
                    format="DD/MM/YYYY"
                    onChange={onChange}
                    sx={{ width: '100%', marginY: 1 }}
                    value={dayjs(value)}
                />
            </LocalizationProvider>

            {errorLabel && (
                <p className="text-red-600 text-xs mb-2">{errorLabel}</p>
            )}
        </div>
    );
}