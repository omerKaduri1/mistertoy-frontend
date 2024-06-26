import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { setMsg } from '../store/actions/app.actions.js'
import { MultiSelect } from "../cmps/MultiSelect.jsx"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                setMsg({ txt: 'Toy Saved!', type: 'success' })
                navigate('/toy')
            })
            .catch(err => {
                setMsg({ txt: 'Could not save toy', type: 'error' })
                console.log('Had issues in toy details', err)
            })
    }

    function onSetLabel(label) {
        const labels = toyToEdit.labels.includes(label) ? toyToEdit.labels.filter(l => l !== label) : [label, ...toyToEdit.labels]
        setToyToEdit(prevToy => ({ ...prevToy, labels }))
    }

    return (
        <section className="toy-edit flex column align-center">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} className="flex column">
                <label htmlFor="name">Name: </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price: </label>
                <input
                    step="0.001"
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price || ''}
                    onChange={handleChange}
                />

                <div>
                    <MultiSelect onSetLabel={onSetLabel} toyToEdit={toyToEdit} />
                </div>
                <div className="edit-btns flex space-between">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy"><button>Cancel</button></Link>
                </div>
            </form>
        </section>
    )
}