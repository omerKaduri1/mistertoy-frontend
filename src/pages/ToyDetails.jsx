import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { reviewService } from "../services/review.service.js"
import { ReviewList } from "../cmps/ReviewList.jsx"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (toyId) {
            loadToy()
            loadReviews()
        }
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    async function loadReviews() {
        try {
            const reviews = await reviewService.query({ aboutToyId: toyId });
            setReviews(reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            const savedReview = await reviewService.add({ txt: review.txt, aboutToyId: toy._id })
            setReviews(prevReviews => [savedReview, ...prevReviews]);
            setReview(utilService.getEmptyReview())
            showSuccessMsg('Review saved!')
        } catch (err) {
            console.log('error saving the review :', err)
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
            setReviews(prev => prev.filter(r => r._id !== reviewId))
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }

    const txtR = review.txt

    if (!toy) return <div>Loading...</div>
    return (
        <section>

            <section className="toy-details flex column align-center">
                <h1>Toy name: {toy.name}</h1>
                <h5>Price: ${toy.price}</h5>
                <p className="toy-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            </section>

            {!!reviews.length && <ReviewList
                reviews={reviews}
                onRemoveReview={onRemoveReview}
                onSaveReview={onSaveReview} />}
            <section className="add-reviews">
                <form className="login-form flex column align-center justify-center" onSubmit={onSaveReview}>
                    <input
                        type="text"
                        name="txt"
                        value={txtR}
                        placeholder="Write a Review"
                        onChange={handleReviewChange}
                        required
                    />
                    <button>Add Review</button>
                </form>
                <section className="toy-actions flex space-between">
                    <Link to={`/toy/edit/${toy._id}`}><button className="fa fa-edit"></button></Link> &nbsp;
                    <Link to={`/toy`}>Back</Link>
                </section>
            </section>

        </section>
    )
}