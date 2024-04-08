import './styles.css';


export default function EachCard ({cardTitle, link }) {
// export default function EachCard () {


    return (
        <a className='eachCardWholeCont'
            href={link} target='_blank'
        >
            <p className='eachCardTitle'>{cardTitle}</p>
        </a>
    )
}