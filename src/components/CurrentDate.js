import React from 'react'

export default function CurrentDate(props) {
    const {
        setNextMonth,
        setPrevMonth,
        currentMonth,
        currentYear
    } = props

    return (
        <>
            <button onClick={() => setPrevMonth()}><i className="fa fa-arrow-left"></i></button>
            <h3>{`${currentMonth} ${currentYear}`}</h3>
            <button onClick={() => setNextMonth()}><i className="fa fa-arrow-right"></i></button>  
        </>
    )
}
