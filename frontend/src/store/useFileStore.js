import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { data } from "react-router-dom";

// File Store

export const useFileStore = create((set) => ({
  fetching: false,
  documents: [],
  uploading: false,
  deleting: false,

  fetch: async () => {
    try {
      set({ fetching: true });
      const res = await axiosInstance.get("/document/fetch");
      set({ documents: res.data.documents });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ fetching: false });
    }
  },

  upload: async (data) => {
    try {
      set({ uploading: true });
      const res = await axiosInstance.post("/document/add", data);
      toast.success("File Uploaded Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ uploading: false });
    }
  },

  deletefile: async (id) => {
    try {
      set({ deleting: true });
      const res = await axiosInstance.post(`/document/delete/${id}`);
      toast.success("File Deleted Successfully");
      set((state) => ({
        documents: state.documents.filter((doc) => doc._id !== id),
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ deleting: false });
    }
  },

}));
