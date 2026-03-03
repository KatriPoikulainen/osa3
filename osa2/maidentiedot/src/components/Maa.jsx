const Maa = ({maa}) => {
    const languages = maa.languages ? Object.values(maa.languages) : []

    return (
        <div>
            <h2>{maa.name.common}</h2>
            <div>capital {maa.capital?.[0] ??'—'}</div>
            <div>area {maa.area}</div>

            <h3>languages</h3>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}

            </ul>

            <img
            src={maa.flags?.png}
            alt={maa.flags?.alt ?? `flag of ${maa.name.common}`}
            width="160"/>

        </div>
    )
}

export default Maa