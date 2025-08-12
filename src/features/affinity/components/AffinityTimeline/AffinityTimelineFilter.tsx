import { AffinityType, TimelineInterval } from '@/types/affinity';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from '@/components/shared/Icons';
import { subDays, subWeeks, subMonths } from 'date-fns';

const INTERVAL_DURATION_LOOKUP: Record<TimelineInterval, number> = {
  DAY: 7,
  WEEK: 8,
  MONTH: 6,
};

const getStartDateForInterval = (interval: TimelineInterval): Date => {
  const today = new Date();
  const duration = INTERVAL_DURATION_LOOKUP[interval];

  switch (interval) {
    case 'DAY':
      return subDays(today, duration);
    case 'WEEK':
      return subWeeks(today, duration);
    case 'MONTH':
      return subMonths(today, duration);
    default:
      return subDays(today, 90); // default fallback
  }
};

interface AffinityTimelineFilterProps {
  selectedType: AffinityType;
  onTypeChange: (type: AffinityType) => void;
  selectedInterval: TimelineInterval;
  onIntervalChange: (interval: TimelineInterval) => void;
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
}

export const AffinityTimelineFilter = ({
  selectedType,
  onTypeChange,
  selectedInterval,
  onIntervalChange,
  onDateRangeChange,
}: AffinityTimelineFilterProps) => {
  const handleIntervalChange = (interval: TimelineInterval) => {
    onIntervalChange(interval);

    if (onDateRangeChange) {
      const startDate = getStartDateForInterval(interval);
      const endDate = new Date();
      onDateRangeChange(startDate, endDate);
    }
  };

  const typeOptions = [
    { value: AffinityType.TAG, label: 'Tags' },
    { value: AffinityType.THEME, label: 'Themes' },
    { value: AffinityType.STYLE, label: 'Styles' },
    { value: AffinityType.MOOD, label: 'Moods' },
  ];

  const intervalOptions = [
    { value: TimelineInterval.DAY, label: 'Daily' },
    { value: TimelineInterval.WEEK, label: 'Weekly' },
    { value: TimelineInterval.MONTH, label: 'Monthly' },
  ];

  const selectedTypeOption = typeOptions.find((option) => option.value === selectedType);
  const selectedIntervalOption = intervalOptions.find(
    (option) => option.value === selectedInterval
  );

  const renderMenu = <T,>(
    options: Array<{ value: T; label: string }>,
    selectedValue: T,
    onValueChange: (value: T) => void,
    selectedOption: { value: T; label: string } | undefined
  ) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>{selectedOption?.label}</span>
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={`card min-w-[120px]`}>
        {options.map((option) => (
          <DropdownMenuItem
            key={String(option.value)}
            onClick={() => onValueChange(option.value)}
            className={`text-lg ${
              selectedValue === option.value
                ? 'bg-surface-50 text-accent font-medium'
                : 'text-foreground'
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex items-center gap-3">
      {/* Type Filter */}
      {renderMenu(typeOptions, selectedType, onTypeChange, selectedTypeOption)}

      {/* Interval Filter */}
      {renderMenu(intervalOptions, selectedInterval, handleIntervalChange, selectedIntervalOption)}
    </div>
  );
};
