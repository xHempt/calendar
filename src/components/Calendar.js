import React, { useEffect, useState } from 'react'
import Day from './Day'
import CurrentDate from './CurrentDate'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Calendar() {
    const [month, setMonth] = useLocalStorage('month', new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const [days, setDays] = useState([])

    function nextMonth() {
        setDays([])
        if (month >= 11) {
            setMonth(0)
            setYear(prev => prev + 1)
            return
        }
        setMonth(prev => prev + 1)
    }

    function prevMonth() {
        setDays([])
        if (month <= 0) {
            setMonth(11)
            setYear(prev => prev - 1)
            return
        }
        setMonth(prev => prev - 1)
    }

    useEffect(() => {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        setDays(days)
    }, [month, year])

    return (
        <div className="calendar">
            <div className="calendar-date">
                <CurrentDate 
                    setNextMonth={nextMonth} 
                    setPrevMonth={prevMonth} 
                    currentMonth={monthName[month]}
                    currentYear={year}
                />
            </div>
            <div className="calendar-grid">
                <h3 className="day-name">Mo</h3>
                <h3 className="day-name">Tu</h3>
                <h3 className="day-name">We</h3>
                <h3 className="day-name">Th</h3>
                <h3 className="day-name">Fr</h3>
                <h3 className="day-name">Sa</h3>
                <h3 className="day-name">Su</h3>
                {days.length > 0 
                ? days.map((day, index) => (
                    <Day key={index} dayInfo={day} />
                ))
                : <></>}
            </div>
        </div>
    )
}
