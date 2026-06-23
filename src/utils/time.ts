export const calTimeFromMinutes = (minutes:number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    return `${h} : ${m < 10 ? "0" + m : m}`
}