// components/TimePicker.tsx
"use client"
import { useState } from 'react';

interface TimePickerProps {
  onSelectTime: (time: string) => void;
  classname?: string;
}

const CustomTimePicker: React.FC<TimePickerProps> = ({ onSelectTime , classname }) => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
    if (onSelectTime) {
      onSelectTime(event.target.value); // Call the callback with selected date
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="time"
        value={selectedTime}
        onChange={handleTimeChange}
        className={`px-3 py-2 border border-black rounded-md ${classname}`}
      />
    </div>
  );
};

export default CustomTimePicker;
