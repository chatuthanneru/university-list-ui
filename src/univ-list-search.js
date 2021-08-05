import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const UnivListSearch = () => {

    const [searchText, setSearchText] = useState('');
    const [selectionType, setSelectionType] = useState('country')
    const [univs, setUnivs] = useState([]);
    const [error, setError] = useState('')

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const onTypeSelection = (e) => {
        console.log(e.target.value)
        setSelectionType(e.target.value);
    }

    const fetchUnivs = () => {
        Axios.get(`http://universities.hipolabs.com/search?${selectionType}=${searchText}`)
            .then(res => {
                if(res.data && res.data instanceof Array) {
                    setUnivs(res.data)
                    console.log(res.data)
                }
            })
            .catch(err => {
                setError('unable to fetch the university list')
            })
    }

    return (
        <div>
            {error? <div> {error} </div>:
            <>
            <input value={searchText} onChange={onSearchTextChange} />
            <select onChange={onTypeSelection}>
                <option value='country'>Country</option>
                <option value='name'>Name</option>
            </select>
            <button onClick={fetchUnivs}>Search</button>

            <div style={{width: '100%'}}>
                {
                    univs.map(e => {
                        return (
                            <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '20px'}}>
                                <span>{e.name}</span>
                                <span>{e.web_pages instanceof Array? e.web_pages[0]: e.web_pages}</span>
                            </div>
                        )
                    })
                }

            </div>
            </>}
        </div>
    )
}

export default UnivListSearch;