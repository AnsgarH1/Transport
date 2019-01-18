import { stationSearchResult, createAnnotations } from '../redux/actions'
import store from '../redux/store'

export default findStation = stationName => {
    let baseUrlString = 'https://www.rmv.de/hapi/location.name?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&type=S&input=';
    let searchString = stationName;

    let urlString = baseUrlString + searchString;
    fetch(urlString, { method: 'GET' })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            store.dispatch(stationSearchResult(response))
            console.log(store.getState())
        })
        .catch((error) => {
            console.log("FETCH ERROR---------------")
            console.log(error)
        });
    
    
}