import { ReviewPreview } from "./ReviewPreview";

export function ReviewList({ reviews, onRemoveReview, onSaveReview }) {
    return (
        <section>
            <h5 className="toy-description-heading">Reviews</h5>
            <ul>
                {reviews.map((review) => (
                    <ReviewPreview key={review._id} review={review} onRemoveReview={onRemoveReview} />
                ))}
            </ul>
        </section>
    )
}