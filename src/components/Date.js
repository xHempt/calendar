import React, { useRef } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { Link } from 'react-router-dom'

export default function Date() {
    const newPlanRef = useRef('')
    const newPlanDateRef = useRef('')

    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day')
    const month = urlParams.get('month')
    const year = urlParams.get('year')

    const [plans, setPlans] = useLocalStorage(`${day}-${month}-${year}-plans`, [])

    function deletePlan(index) {
        const id = index
        setPlans(prev => prev.filter((plan, index) => index !== id))
    }

    function addPlan(e) {
        e.preventDefault()
        setPlans(prev => [...prev, { name: newPlanRef.current.value, date: newPlanDateRef.current.value }])
    }

    function compare(a,b) {
        let time1 = parseFloat(a.date.replace(':','.').replace(/[^\d.-]/g, ''));
        let time2 = parseFloat(b.date.replace(':','.').replace(/[^\d.-]/g, ''));
        if(a.date.match(/.*pm/)) time1 += 12; if(b.date.match(/.*pm/)) time2 += 12;
        if (time1 < time2) return -1;
        if (time1 > time2) return 1;
        return 0;
    }

    const sortedPlans = plans.sort(compare)

    console.log(sortedPlans)

    return (
        <div className="plans-for-date">
            <div className="add-plans">
                <Link to='/'>&#60; Home</Link>
                <h1>{day} {monthName[month]} {year}</h1>
                <form onSubmit={addPlan}>
                    <input type="text" required ref={newPlanRef} placeholder="Add a plan" />
                    <input type="time" name="time" id="time" required ref={newPlanDateRef} />
                    <button type="submit"><i className="fa fa-plus"></i></button>
                </form>
            </div>
            {sortedPlans.length > 0 
            ? sortedPlans.map((plan, index) => (
                <div className="plan" key={index}><span><h3 className="highlight">{plan.date}</h3> {plan.name}</span><button onClick={() => deletePlan(index)}><i className="fa fa-trash"></i></button></div>
                ))
                : <h2 className="no-plans">No plans yet!</h2>}
        </div>
    )
}
