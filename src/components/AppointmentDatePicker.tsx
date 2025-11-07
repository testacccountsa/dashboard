import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppointmentDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  error?: string;
  availableTimeSlots?: string[];
  onTimeSelect?: (time: Date) => void;
  className?: string;
}

export function AppointmentDatePicker({
  value,
  onChange,
  error,
  availableTimeSlots,
  onTimeSelect,
  className
}: AppointmentDatePickerProps) {

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const now = new Date();
  const maxDate = new Date();
  maxDate.setDate(now.getDate() + 30);

  const isDateSelectable = (date: Date) => {
    const isInRange = date >= now && date <= maxDate;
    const day = date.getDay();
    return isInRange && day !== 0;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Calendar
        mode="single"
        selected={value}
        onSelect={(date) => {
          setSelectedSlot(null);
          onChange(date);
        }}
        disabled={(date) => !isDateSelectable(date)}
        className="rounded-md border"
      />

      {availableTimeSlots && availableTimeSlots.length > 0 && value && onTimeSelect && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>

          <div className="grid grid-cols-3 gap-2">
            {availableTimeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedSlot(slot);

                  const newDate = new Date(value);
                  const [hours, minutes] = slot.split(':');
                  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

                  onTimeSelect(newDate); // ✅ Pass actual Date object
                }}
                className={cn(
                  "text-sm",
                  selectedSlot === slot && "bg-blue-600 text-white"
                )}
              >
                {formatTime(slot)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
