type clockProps = {
    hour: number,
    minutes: number
}

const Clock = ({hour, minutes}:clockProps) => {
    

    return (
        <>
        <div className="bg-gray-200 w-85 h-85 relative rounded-full m-auto">
            <div 
                className="absolute origin-bottom w-4 h-25 bg-blue-200 top-[calc(50%-100px)] left-[calc(50%-8px)]"
                style={{transform: `rotate(${hour}deg)`}}>
            </div>
            <div 
                className="absolute origin-bottom w-2.5 h-40 bg-blue-400 top-[calc(50%-160px)] left-[calc(50%-8px)]"
                style={{transform: `rotate(${minutes}deg)`}}>
            </div>
        </div>
        </>
    )

}

export default Clock