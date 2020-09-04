import React, { useEffect } from 'react';
import { useField } from '../../customHooks/inputHooks';


const SearchInput = ({ setSearchLocation }) => {
    const latitudeInput = useField('number');
    const longitudeInput = useField('number');
    const cityInput = useField('text');
    const dataQueryTypeSelect = useField('select');

    const handleSubmit = () => {
        if (Number(dataQueryTypeSelect.value) === 0) {
            if (!latitudeInput.value || !longitudeInput.value) {
                alert("lat and lon can not be empty")
                return;
            }
            return setSearchLocation({
                lat: latitudeInput.value,
                lon: longitudeInput.value
            })
        }
        if (!cityInput.value.length) {
            alert("Adress can not be empty")
            return;
        }
        return setSearchLocation({
            address: cityInput.value
        })
    };

    useEffect(() => {
        if (dataQueryTypeSelect.value == 0) {
            cityInput.changeValue('')
        }
        if (dataQueryTypeSelect.value == 1) {
            latitudeInput.changeValue(0);
            longitudeInput.changeValue(0);
        }
    }, [dataQueryTypeSelect.value])

    useEffect(() => {
        latitudeInput.changeValue(44.77218);
        longitudeInput.changeValue(17.191000);
        dataQueryTypeSelect.changeValue(0);
    }, []);

    const resetFields = () => {
        latitudeInput.changeValue('');
        longitudeInput.changeValue('');
        cityInput.changeValue('')
    }
    return (
        <>

            <div className="form-group  mt-2">
                <label htmlFor="exampleFormControlSelect1">Get Weather By</label>
                <select className="form-control" onChange={dataQueryTypeSelect.onChange} value={dataQueryTypeSelect.value}>
                    <option value={0}>Coordinates</option>
                    <option value={1}>City</option>

                </select>
            </div>
            {Number(dataQueryTypeSelect.value) === 0 ?
                <> <div className="form-group ">
                    <label>Latitude</label>
                    <input type={latitudeInput.type} onChange={latitudeInput.onChange} value={latitudeInput.value} className="form-control" reset='' />
                    <label>Longitude</label>
                    <input type={longitudeInput.type} onChange={longitudeInput.onChange} value={longitudeInput.value} className="form-control" />
                </div>
                </>
                :
                <>
                    <div className="form-group ">
                        <label>City</label>
                        <input type={cityInput.type} onChange={cityInput.onChange} value={cityInput.value} className="form-control" />
                    </div>
                </>}
            <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-2">Get Weather Data</button>

        </>
    );
};

export default SearchInput;