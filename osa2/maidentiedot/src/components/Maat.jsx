import Maa from './Maa'

const Maat = ({maat, onShow}) => {
    if (maat.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
        if (maat.length > 1) {
            return (
            <ul>
                {maat.map(m =>(
                    <li key={m.cca3}>{m.name.common}{' '}
                    <button onClick={() => onShow(m.name.common)}>Show</button></li>
                ))}
            </ul>
        )
    }

    if (maat.length === 1) {
        return <Maa maa={maat[0]}/>
    }

    return null

}

export default Maat