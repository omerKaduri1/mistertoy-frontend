export function ReviewPreview({ review, onRemoveReview }) {
    return (
        <li key={review._id}>
            By: {review.byUser.fullname} - {review.txt}
            <button className="fa fa-trash" type="button" onClick={() => onRemoveReview(review._id)}>
            </button>
        </li>
    )
}