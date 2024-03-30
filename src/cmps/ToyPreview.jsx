import { Link } from "react-router-dom"
import { utilService } from "../services/util.service.js"
import { Stack } from "@mui/material"
import Chip from '@mui/material/Chip'

export function ToyPreview({ toy, onRemoveToy }) {

    const chipColors = ['info', 'success', 'warning', 'secondary', 'primary']

    function getInStockVal() {
        if (toy.inStock) return 'In stock'
        else return 'Out of stock'
    }

    function getInStockStyle() {
        if (toy.inStock) return 'green'
        else return 'red'

    }

    return (
        <article className="toy-preview flex column">
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p style={{ color: getInStockStyle() }}>{getInStockVal()}</p>
            <img src={utilService.getRandomImgSrc()} alt="toy" title="toy" />
            <section className="labels">
                <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                        {
                            toy.labels.map((label, idx) =>
                                <Chip
                                    key={idx}
                                    size="small"
                                    sx={{ display: 'flex', width: 'fit-content' }}
                                    label={label}
                                    color={chipColors[idx]} />
                            )
                        }
                    </Stack>
                </Stack>
            </section>

            <section className="preview-btns flex space-between">
                <button className="remove-btn fa fa-trash" onClick={() => onRemoveToy(toy._id)}></button> &nbsp; | &nbsp;
                <Link className="fa fa-edit" to={`/toy/edit/${toy._id}`}></Link> &nbsp; | &nbsp;
                <Link to={`/toy/${toy._id}`}>More details</Link>
            </section>

        </article>
    )
}