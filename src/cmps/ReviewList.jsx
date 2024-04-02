import { ReviewPreview } from "./ReviewPreview";

export function ReviewList({ reviews, onRemoveReview, onSaveReview }) {
    return (
        <section className="flex column align-center">
            <h3>Reviews:</h3>
            <ul className="clean-list">
                {reviews.map((review) => (
                    <ReviewPreview
                        key={review._id}
                        review={review}
                        onRemoveReview={onRemoveReview} />
                ))}
            </ul>
        </section>
    )
}