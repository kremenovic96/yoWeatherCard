import React, { useEffect } from 'react';
import { useField } from '../../customHooks/inputHooks';


const SearchInput = ({ setSearchLocation }) => {
    const latitudeInput = useField('number');
    const longitudeInput = useField('number');
    const cityInput = useField('text');
    const dataQueryTypeSelect = useField('select');

    const handleSubmit = () => {
        if (Number(dataQueryTypeSelect.value) === 0) {
            return setSearchLocation({
                lat: latitudeInput.value,
                lon: longitudeInput.value
            })
        }
        return setSearchLocation({
            address: cityInput.value
        })

    };

    useEffect(() => {
        latitudeInput.changeValue(44.77218);
        longitudeInput.changeValue(17.191000);
        dataQueryTypeSelect.changeValue(0);
    }, []);

    return (
        <>
            <div className="form-group mt-2">
                <label htmlFor="exampleFormControlSelect1">Get Weather By</label>
                <select className="form-control" onChange={dataQueryTypeSelect.onChange} value={dataQueryTypeSelect.value}>
                    <option value={0}>Coordinates</option>
                    <option value={1}>City</option>

                </select>
            </div>
            {Number(dataQueryTypeSelect.value) === 0 ?
                <> <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Latitude</label>
                    <input type={latitudeInput.type} onChange={latitudeInput.onChange} value={latitudeInput.value} className="form-control" reset='' placeholder="Latitude" />
                </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Longitude</label>
                        <input type={longitudeInput.type} onChange={longitudeInput.onChange} value={longitudeInput.value} className="form-control" placeholder="Longitude" />
                    </div>
                </>
                :
                <>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">City</label>
                        <input type={cityInput.type} onChange={cityInput.onChange} value={cityInput.value} className="form-control" placeholder="City" />
                    </div>
                </>}

            <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-2">Get Weather Data</button>
        </>
    );
};

export default SearchInput;