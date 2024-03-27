import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"

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
        setFilterByToEdit(filter)
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                {/* <label htmlFor="all">
                    <input defaultChecked={filterByToEdit.isInStock === 'all'} type="radio" name="isInStock" value="all" id="all" onChange={handleChange} />
                    All
                </label>

                <label htmlFor="in-stock">
                    <input defaultChecked={filterByToEdit.isInStock === 'inStock'} type="radio" name="isInStock" value="inStock" id="inStock" onChange={handleChange} />
                    In stock
                </label>

                <label htmlFor="out-of-stock">
                    <input defaultChecked={filterByToEdit.isInStock === 'outOfStock'} type="radio" name="isInStock" value="outOfStock" id="outOfStock" onChange={handleChange} />
                    Out of stock
                </label> */}

                <label>
                    <span className='filter-label'>In stock</span>
                    <select
                        onChange={handleChange}
                        name="inStock"
                        value={filterByToEdit.inStock || ''}>
                        <option value=""> All </option>
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                    </select>
                </label>

                <label>
                    <span className='filter-label'>Filter By</span>
                    <select
                        onChange={onSelectLabels}
                        name="labels"
                        multiple
                        value={filterByToEdit.labels || []}>
                        <option value=""> All </option>
                        <>
                            {toyLabel.map(label => <option key={label} value={label}>{label}</option>)}
                        </>
                    </select>
                </label>
            </form>

        </section>
    )
}