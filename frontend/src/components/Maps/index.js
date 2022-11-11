// frontend/src/components/Maps/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ({lng, lat}) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
  console.log("lng in map contain:", lng)
  console.log("lat in map container:", lat)
  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Maps lng={lng} lat={lat} apiKey={key} />
  );
};

export default MapContainer;
