import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'
import { setMsg } from '../store/actions/app.actions.js'
import { ToySort } from '../cmps/ToySort.jsx'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                setMsg({ txt: 'Cannot load toys!', type: 'error' })
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    function onRemoveToy(toyId) {
        console.log(toyId);
        removeToyOptimistic(toyId)
            .then(() => {
                setMsg({ txt: 'Toy removed successfully', type: 'success' })
            })
            .catch(err => {
                setMsg({ txt: 'Cannot remove toy', type: 'error' })
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                setMsg({ txt: `Toy added (id: ${savedToy._id} )`, type: 'success' })
            })
            .catch(err => {
                setMsg({ txt: 'Cannot add toy', type: 'error' })
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                setMsg({ txt: `Toy updated to price: $${savedToy.price}`, type: 'success' })
            })
            .catch(err => {
                setMsg({ txt: 'Cannot update toy', type: 'error' })
            })
    }

    return (
        <div className='toy-app'>
            <main className='main-container flex column align-center'>
                <Link to="/toy/edit"><button className='add-btn'>Add Toy</button></Link>
                {/* <button className='add-btn' onClick={onAddToy}>Add Random Toy</button> */}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort}/>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                }
            </main>
        </div>
    )
}
