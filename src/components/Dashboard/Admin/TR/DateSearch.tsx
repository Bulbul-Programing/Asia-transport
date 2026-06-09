'use client'
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const DateSearch = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [date, setDate] = useState<Date>()
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const handleSelect = (selectedDate?: Date) => {
        if (!selectedDate) return;

        setDate(selectedDate);
        setOpen(false); 

        const params = new URLSearchParams(searchParams.toString());
        params.set("date", format(selectedDate, "yyyy-MM-dd"));

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                        {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        defaultMonth={date}
                        disabled={isPending}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DateSearch;