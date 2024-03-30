import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"
import { LabelSelect } from "./LabelSelect.jsx"

const toyLabel = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onSelectLabels(ev) {
        const label = ev.target.value
        let filter = { ...filterByToEdit }
        if (filter.labels.includes(label)) filter.labels = filter.labels.filter(l => l !== label)
        else filter.labels.push(label)
        if (label === '') filter = { ...filterByToEdit, labels: [...toyLabel] }
        setFilterByToEdit(filter)
    }

    return (
        <section className="toy-filter">
            <form onSubmit={onSubmit} className="flex column">
                <section className="name-inStock-filter flex align-center">

                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        id="name"
                        name="txt"
                        placeholder="By name"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />

                    <label htmlFor="inStock">Availability:</label>
                    <span className='filter-label'></span>
                    <select
                        onChange={handleChange}
                        name="inStock"
                        value={filterByToEdit.inStock || ''}>
                        <option value="all"> All </option>
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                    </select>
                </section>

                <section className="labels-filter">
                    <LabelSelect setFilterByToEdit={setFilterByToEdit} />
                </section>
            </form>

        </section>
    )
}