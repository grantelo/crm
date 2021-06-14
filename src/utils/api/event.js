import axios from "axios";

export default {
    getEventById: id => axios.get(`/events/${id}`)
}