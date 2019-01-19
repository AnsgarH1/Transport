import { CREATE_ANNOTATIONS, createAnnotations } from '../../redux/actions'
import { store } from '../../redux/store'

const merge = (prev, next) => Object.assign({}, prev, next)

const baseGeoJSON = {
    "type": "FeatureCollection",
    "features": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            8.243,
            50.07
          ]
        }
      }
}



export default createAnnotations = 
    store.dispatch(createAnnotations())