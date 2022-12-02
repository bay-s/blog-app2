import { Link } from "react-router-dom";


const PostTag = (props) => {

    return(
props.tag.length < 1 ? "" : props.tag.map(tags => {
    return <Link to='/post-all/id' className='is-size-7 tag is-info'>{tags}</Link>
})
    )
}

export default PostTag;