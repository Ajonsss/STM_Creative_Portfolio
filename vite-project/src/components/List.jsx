const List = ({Title}) => {
    return (
    <>
        <ul>
            {Title && Title((Title, index) =>(
                <li key={index}>{Title}</li>
            ))}
        </ul>
    </>
    ) 
}

export default List;