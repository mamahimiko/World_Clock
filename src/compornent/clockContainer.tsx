import Clock from "./clock"
import { calTimeFromMinutes } from "@/utils/time"

type clockContainerProps = {
    hour: number,
    minutes: number,
    timeInMinutes: number
}

const ClockContainer = ({hour, minutes, timeInMinutes}:clockContainerProps) => {
    
    const Time = calTimeFromMinutes(timeInMinutes)

    return (
        <div className="p-24">
            <Clock hour={hour} minutes={minutes} />
            <div className="p-10 text-center">
                <p className="text-5xl">{Time}</p>
            </div>
        </div>
    )

}

export default ClockContainer