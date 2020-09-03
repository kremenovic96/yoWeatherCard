import React, { useEffect } from 'react';
import { useField } from '../../customHooks/inputHooks';


const SearchInput = ({ setSearchLocation }) => {
    const latitudeInput = useField('number');
    const longitudeInput = useField('number');

    const handleSubmit = () => {
        setSearchLocation({
            lat: latitudeInput.value,
            lon: longitudeInput.value
        })
    };

    useEffect(() => {
        latitudeInput.changeValue(44.77218);
        longitudeInput.changeValue(17.191000);
    }, []);

    return (
        <>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>Coordinates</option>
                    <option>City</option>
                 
                </select>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Latitude</label>
                <input type={latitudeInput.type} onChange={latitudeInput.onChange} value={latitudeInput.value} class="form-control" reset='' placeholder="Latitude" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Longitude</label>
                <input type={longitudeInput.type} onChange={longitudeInput.onChange} value={longitudeInput.value} class="form-control" placeholder="Longitude" />
            </div>

            <button onClick={handleSubmit} type="submit" class="btn btn-primary">Get Weather Data</button>
        </>
    );
};

export default SearchInput;