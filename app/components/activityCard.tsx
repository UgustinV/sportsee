export default function ActivityCard({ activity, value, unit, isTime }: { activity: string, value: number, unit: string, isTime?: boolean }) {
    if(isTime) {
        unit = String(value % 60);
        value = Math.floor(value / 60);
    }
    return (
        <div className="bg-[#0B23F4] text-white rounded-[10px] px-7 py-5 shadow-md flex flex-col items-start gap-5 justify-center">
            <h4 className="text-sm">{activity}</h4>
            <div className="flex items-baseline">
                <span className="text-[22px]">{value}{isTime ? "h" : ""}</span>
                <p className="text-base text-[#B6BDFC]">{unit}{isTime ? "min" : ""}</p>
            </div>
        </div>
    );
}