import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list clean-list flex justify-center">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy}/>

                    <div>
                        {/* <button onClick={() => onRemoveToy(toy._id)}>x</button> */}
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>

                </li>)}
        </ul>
    )
}