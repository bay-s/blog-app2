import { Link } from "react-router-dom";



const PostCat = (props) => {

    return(
        props.cat.length < 1 ? "" : props.cat.map(cats => {
            return <Link to={`/posts/category-name/${cats}`} className='is-size-7 tag is-info'>{cats},</Link>
        })
    )
}

export default PostCat;