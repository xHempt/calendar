import React from 'react'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function Day({ dayInfo }) {
    const currentDay = new Date().toDateString()
    const dayOfTheWeek = dayInfo.getDay()

    return (
        <Link to={`/date/?day=${dayInfo.getDate()}&month=${dayInfo.getMonth()}&year=${dayInfo.getFullYear()}`} style={
            { gridColumn: `${dayOfTheWeek === 0 ? 7 : dayOfTheWeek} / ${dayOfTheWeek === 0 ? 8 : dayOfTheWeek + 1}`,
            backgroundColor: `${dayInfo.toDateString() === currentDay ? '#42cbf5' : ''}`,
            color: `${dayInfo.toDateString() === currentDay ? '#fff' : ''}`
        }
        } className="day">
            {dayInfo.getDate()}
        </Link>
    )
})
