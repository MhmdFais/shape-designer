import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/shapes",
  headers: { "Content-Type": "application/json" },
});

export const shapeService = {
  async getAllShapes() {
    const { data } = await api.get("");
    return data;
  },

  async getShapeById(id) {
    const { data } = await api.get(`/${id}`);
    return data;
  },

  async createShape(shapeData) {
    const { data } = await api.post("", shapeData);
    return data;
  },

  async updateShape(id, shapeData) {
    const { data } = await api.put(`/${id}`, shapeData);
    return data;
  },

  async deleteShape(id) {
    await api.delete(`/${id}`);
  },
};
