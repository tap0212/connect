import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, data) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//event calls

//create an event
export const createEvent = (userId, token, event) => {
  return fetch(`${API}/event/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: event
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//get all events
export const getEvents = () => {
  return fetch(`${API}/events`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//delete an event

export const deleteEvent = (eventId, userId, token) => {
  return fetch(`${API}/event/${eventId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//get an event

export const getEvent = eventId => {
  return fetch(`${API}/event/${eventId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//update an event

export const updateEvent = (eventId, userId, token, event) => {
  return fetch(`${API}/event/${eventId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: event
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


//location

export const createLocation = (location) => {
  return fetch(`${API}/location/create`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(location)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}

export const getAllLocations = () => {
  return fetch(`${API}/locations`,{
    method:"GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}

export const getLocation = (locationId) => {
  return fetch(`${API}/location/locationId`, {
    method:"GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}

export const deleteLocation = (locationId) => {
  return fetch(`${API}/location/${locationId}`,{
    method:"DELETE",
    headers:{
      Accept:"application/json"
    }
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}

export const updateLocation = (locationId, location) => {
  return fetch(`${API}/location/${locationId}`, {
    method:"PUT",
    headers:{
      Accept:"application/json"
    },
    body:JSON.stringify(location)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}

//get all user details
export const getUserNames = () => {
  return fetch(`${API}/users`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
