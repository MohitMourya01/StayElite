const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export const register = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/register`,
        {
            method: 'POST',
            credentials: "include", // set cookie
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        }
    );
    const responseBody = await response.json();
    if(!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const login = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`,
    {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json();
    if(!response.ok) {
        throw new Error(body.message);
    }
    return body;
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate-token`, {
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Token invalid")
    }
    return response.json();
}

export const getCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/currentUser`, {
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error("Error fetching User")
    }
    return response.json();
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        credentials: "include",
        method: "POST"
    })
    if(!response.ok) {
        throw new Error("Error during sign out")
    }
    //return response.json();
}


export const addMyHotel = async (hotelFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels`,
    {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });
    
    if(!response.ok) {
        throw new Error("Failed to add Hotel");
    }

    return response.json();
}

export const fetchMyHotels = async () => {
    //get userId from cookie
    const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels`, {
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
}

export const fetchMyHotelsById = async (hotelId) => {
    //get userId from cookie
    const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels/${hotelId}`, {
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
}

export const updateMyHotelById = async (hotelFormData) => {
    //console.log(hotelFormData.get("hotelId"), "hotel")
    const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include"
        
    });
    if(!response.ok) {
        throw new Error("Failed to update hotels");
    }

    return response.json();
}

export const searchHotels = async (searchParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    // sorting
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility) );

    searchParams.types?.forEach((type) => queryParams.append("types", type) );

    searchParams.stars?.forEach((star) => queryParams.append("stars", star) );



    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/search?${queryParams}`);

    if(!response.ok) {
        throw new Error("Failed fetching hotels");
    }

    return response.json();
}

export const fetchHotels = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels`)
    if(!response.ok) {
        throw new Error("Failed fetching hotels");
    }

    return response.json();
}

export const fetchHotelById = async(hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/${hotelId}`)

    if(!response.ok) {
        throw new Error("Failed fetching hotels");
    }

    return response.json();
}


export const createPaymentIntent = async (hotelId, numberOfNights) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/${hotelId}/bookings/payment-intent`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ numberOfNights }),
            headers: {
               "Content-Type": "application/json",
            },
        }
    );

    if(!response.ok) {
        throw new Error("Error fetching payment intent");
    }
   
    return await response.json();
}


export const createRoomBooking = async (formData) => {   
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });
    console.log(response, "res");

    if(!response.ok) {
        throw new Error("Error while booking room");
    }
   
}

export const fetchMyBookings = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/my-bookings`, {
        credentials: "include",
    });

    if(!response.ok) {
        throw new Error("Unable to fetch bookings");
    }

    return response.json();
}