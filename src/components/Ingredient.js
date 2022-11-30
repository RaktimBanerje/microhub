import axios from 'axios'
import React from 'react'
import { memo } from 'react'

const Ingredient = ({data, setData, unit, setUnit}) => {

    const [food, setFood] = React.useState(data)
    const [searchFoods, setSearchFoods] = React.useState([])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        setData(food)
    } 

    React.useEffect(() => {
        var script1 = document.createElement('script');
        script1.id = "customScript"
        script1.src ="/assets/js/custom.js"
        document.head.appendChild(script1); //or something 

        document.querySelector('#selectpicker').addEventListener("change", function() {
            const keyword = document.getElementById("selectpicker").value
            setData(keyword)
        })
    })

    React.useEffect(()=>{
        axios.get("/api/search")
        .then(response => {
            const records = []
            response.data.forEach(data => records.push(data.keyword))
            setSearchFoods(records)
        })
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <select 
                    id="selectpicker"
                    className="form-control bg-light border-0 small selectpicker"
                    data-live-search="true"
                    data-live-search-placeholder="Search for food"
                    data-size={10}
                >
                    <>
                    <option value="">--Search for food--</option>
                    {Array.from(new Set(searchFoods)).map((food, index) => <option key={index} value={food}><p style={{color: "black"}}>{food}</p></option>)}
                    </>
                </select>

                <select
                    className="form-control mx-4"
                    onChange={(event) => setUnit(event.target.value)}
                    value={unit}
                >
                    <option value="g">Gram</option>
                    <option value="l">Liter</option>
                </select>
                <button className="btn btn-outline-success" type="submit">
                    <i className="fas fa-search fa-sm"></i> Search
                </button>
            </div>
        </form>
    )
}

export default memo(Ingredient)