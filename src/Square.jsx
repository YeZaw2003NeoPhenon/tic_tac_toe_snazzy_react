
export const Square = ({values , handleClick , className }) => {
    return(
        <button className = {`square ${className}`} onClick={handleClick}>{values}</button>
    )
}