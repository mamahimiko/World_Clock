type clockProps = {
    hour: number,
    minutes: number
}

const Clock = ({hour, minutes}:clockProps) => {
    

    return (
        <>
        <div className="bg-gray-200 w-125 h-125 relative rounded-full m-auto">
            <div 
                className="absolute origin-bottom w-4 h-40 bg-blue-200 top-[calc(50%-160px)] left-[calc(50%-8px)]"
                style={{transform: `rotate(${hour}deg)`}}>
            </div>
            <div 
                className="absolute origin-bottom w-2.5 h-55 bg-blue-400 top-[calc(50%-220px)] left-[calc(50%-8px)]"
                style={{transform: `rotate(${minutes}deg)`}}>
            </div>
        </div>
        </>
    )

}

export default Clock