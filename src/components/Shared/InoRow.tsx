import React from "react";

interface InfoRowProps {
    label: string;
    value?: string | number | null;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-semibold text-foreground wrap-break-word">
                {value ?? "—"}
            </span>
        </div>
    );
};

export default InfoRow;
